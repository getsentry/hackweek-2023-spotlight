import { createWriteStream } from 'fs';
import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import kleur from 'kleur';
import { createGunzip, createInflate } from 'zlib';

function generateUuidv4(): string {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let rnd = Math.random() * 16;
    rnd = (dt + rnd) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? rnd : (rnd & 0x3) | 0x8).toString(16);
  });
}

class MessageBuffer<T> {
  private size: number;
  private items: [number, T][];
  private writePos = 0;
  private head = 0;
  private timeout = 10;
  private readers = new Map<string, (item: T) => void>();
  private timeoutId: NodeJS.Timeout | undefined;

  constructor(size = 100) {
    this.size = size;
    this.items = new Array(size);
  }

  put(item: T): void {
    const curTime = new Date().getTime();
    this.items[this.writePos % this.size] = [curTime, item];
    this.writePos += 1;
    if (this.head === this.writePos) {
      this.head += 1;
    }

    const minTime = curTime - this.timeout * 1000;
    let atItem;
    while (this.head < this.writePos) {
      atItem = this.items[this.head % this.size];
      if (atItem === undefined) break;
      if (atItem[0] > minTime) break;
      this.head += 1;
    }
  }

  subscribe(callback: (item: T) => void): string {
    const readerId = generateUuidv4();
    this.readers.set(readerId, callback);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.stream(readerId));
    return readerId;
  }

  unsubscribe(readerId: string): void {
    this.readers.delete(readerId);
    clearTimeout(this.timeoutId);
  }

  stream(readerId: string, readPos = this.head): void {
    clearTimeout(this.timeoutId);

    const cb = this.readers.get(readerId);
    if (!cb) return;

    let atReadPos = readPos;
    let item;
    /* eslint-disable no-constant-condition */
    while (true) {
      item = this.items[atReadPos % this.size];
      // atReadPos >= this.writePos prevents the case where we have a full buffer
      if (typeof item === 'undefined' || atReadPos >= this.writePos) {
        break;
      }
      cb(item[1]);
      atReadPos += 1;
    }

    this.timeoutId = setTimeout(() => this.stream(readerId, atReadPos), 500);
  }
}

type Payload = [string, string];

function getCorsHeader(): { [name: string]: string } {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
  };
}

function handleStreamRequest(req: IncomingMessage, res: ServerResponse, buffer: MessageBuffer<Payload>): void {
  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (req.url == '/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...getCorsHeader(),
        Connection: 'keep-alive',
      });
      res.flushHeaders();

      const sub = buffer.subscribe(([payloadType, data]) => {
        log(`🕊️ sending to Spotlight`);
        res.write(`event:${payloadType}\n`);
        // This is very important - SSE events are delimited by two newlines
        data.split('\n').forEach(line => {
          res.write(`data:${line}\n`);
        });
        res.write('\n');
      });

      req.on('close', () => {
        buffer.unsubscribe(sub);
        res.end();
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    if (req.url == '/stream') {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Cache-Control': 'no-cache',
          ...getCorsHeader(),
        });
        res.end();
      } else if (req.method === 'POST') {
        log(`📩 Received event`);
        let body: string = '';
        let stream = req;

        // Check for gzip or deflate encoding and create appropriate stream
        const encoding = req.headers['content-encoding'];
        if (encoding === 'gzip') {
          // @ts-ignore
          stream = req.pipe(createGunzip());
        } else if (encoding === 'deflate') {
          // @ts-ignore
          stream = req.pipe(createInflate());
        }

        // Read the (potentially decompressed) stream
        stream.on('readable', () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            body += chunk;
          }
        });

        stream.on('end', () => {
          buffer.put([`${req.headers['content-type']}`, body]);

          if (process.env.SPOTLIGHT_CAPTURE) {
            const timestamp = new Date().getTime();
            const contentType = `${req.headers['content-type']}`;
            const filename = `${contentType.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${timestamp}.txt`;

            createWriteStream(filename).write(body);
            log(`🗃️ Saved data to ${filename}`);
          }

          res.writeHead(204, {
            'Cache-Control': 'no-cache',
            ...getCorsHeader(),
            Connection: 'keep-alive',
          });
          res.end();
        });
      }
    } else {
      res.writeHead(404);
      res.end();
    }
  }
}

function startServer(buffer: MessageBuffer<Payload>, port: number): Server {
  const server = createServer((req, res) => {
    handleStreamRequest(req, res, buffer);
  });

  server.on('error', e => {
    if ('code' in e && e.code === 'EADDRINUSE') {
      setTimeout(() => {
        server.close();
        server.listen(port);
      }, 5000);
    }
  });
  server.listen(port, () => {
    log(`Sidecar listening on ${port}`);
  });

  return server;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function log(...args: any[]) {
  console.log(kleur.bold(kleur.magenta('🔎 [Spotlight]')), ...args);
}

let serverInstance: Server;

const isValidPort = (value: string | number) => {
  if (typeof value === 'string') {
    const portNumber = parseInt(value, 10);
    return /^\d+$/.test(value) && portNumber > 0 && portNumber <= 65535;
  }
  return value > 0 && value <= 65535;
};

export function setupSidecar(port?: string | number): void {
  let sidecarPort = 8969;

  if (port && !isValidPort(port)) {
    log('Please provide a valid port.');
    process.exit(1);
  } else if (port) {
    sidecarPort = typeof port === 'string' ? parseInt(port, 10) : port;
  }

  const buffer: MessageBuffer<Payload> = new MessageBuffer<Payload>();

  if (!serverInstance) {
    serverInstance = startServer(buffer, sidecarPort);
  }
}

function shutdown() {
  if (serverInstance) {
    log('Shutting down server');
    serverInstance.close();
  }
}

process.on('SIGTERM', () => {
  shutdown();
});
