#!/usr/bin/env node
import { promisify } from 'node:util';
import { execFile as execFileCb } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { join } from 'node:path';
import { mkdtemp, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { inject } from 'postject';
import { unsign } from 'macho-unsign';

const execFile = promisify(execFileCb);

const DIST_DIR = './dist';
const ASSETS_DIR = join(DIST_DIR, 'overlay');
const MANIFEST_NAME = 'manifest.json';
const MANIFEST_PATH = join(ASSETS_DIR, MANIFEST_NAME);
const ENTRY_POINT_NAME = 'src/index.html';
const SEA_CONFIG_PATH = join(DIST_DIR, 'sea-config.json');
const SPOTLIGHT_BLOB_PATH = join(DIST_DIR, 'spotlight.blob');
const NODE_VERSION = '22.11.0';
const PLATFORMS = (process.env.BUILD_PLATFORMS || `${process.platform}-${process.arch}`).split(',').map(p => p.trim());
const manifest = JSON.parse(await readFile(MANIFEST_PATH));
const seaConfig = {
  main: join(DIST_DIR, 'spotlight.cjs'),
  output: SPOTLIGHT_BLOB_PATH,
  disableExperimentalSEAWarning: true,
  useSnapshot: false,
  useCodeCache: false, // We do cross-compiling so disable this
  assets: {
    [MANIFEST_NAME]: MANIFEST_PATH,
    [ENTRY_POINT_NAME]: join(ASSETS_DIR, ENTRY_POINT_NAME),
    ...Object.fromEntries(Object.values(manifest).map(entry => [entry.file, join(ASSETS_DIR, entry.file)])),
  },
};

async function run(cmd, ...args) {
  let output;
  try {
    output = await execFile(cmd, args, { encoding: 'utf8' });
  } catch (err) {
    console.error(`Failed to \`run ${cmd} ${args.join(' ')}\``);
    console.error(err.stdout);
    console.error(err.stderr);
    process.exit(err.code);
  }
  if (output.stdout.trim()) {
    console.log(output.stdout);
  } else {
    console.log(`> ${[cmd, ...args].join(' ')}`);
  }
  return output.stdout;
}

async function getNodeBinary(platform, targetPath = DIST_DIR) {
  const suffix = platform.startsWith('win') ? 'zip' : 'tar.xz';
  const remoteArchiveName = `node-v${NODE_VERSION}-${platform}.${suffix}`;
  const url = `https://nodejs.org/dist/v${NODE_VERSION}/${remoteArchiveName}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${url}`);
  const tmpDir = await mkdtemp(join(tmpdir(), remoteArchiveName));
  const stream = createWriteStream(join(tmpDir, remoteArchiveName));
  await finished(Readable.fromWeb(resp.body).pipe(stream));
  let sourceFile;
  let targetFile;
  if (platform.startsWith('win')) {
    await run('unzip', '-qq', stream.path, '-d', tmpDir);
    sourceFile = join(tmpDir, `node-v${NODE_VERSION}-${platform}`, 'node.exe');
    targetFile = join(targetPath, `spotlight-${platform}.exe`);
  } else {
    await run('tar', '-xf', stream.path, '-C', tmpDir);
    sourceFile = join(tmpDir, `node-v${NODE_VERSION}-${platform}`, 'bin', 'node');
    targetFile = join(targetPath, `spotlight-${platform}`);
  }
  if (platform.startsWith('darwin')) {
    const unsigned = unsign(await readFile(sourceFile));
    await writeFile(targetFile, Buffer.from(unsigned));
    console.log('Signature removed from macOS binary', targetFile);
  } else {
    await copyFile(sourceFile, targetFile);
  }
  await rm(tmpDir, { recursive: true });
  return targetFile;
}

await writeFile(SEA_CONFIG_PATH, JSON.stringify(seaConfig));
await run(process.execPath, '--experimental-sea-config', SEA_CONFIG_PATH);
await Promise.all(
  PLATFORMS.map(async platform => {
    const nodeBinary = await getNodeBinary(platform);
    console.log('Injecting spotlight blob into node executable...');
    await inject(nodeBinary, 'NODE_SEA_BLOB', await readFile(SPOTLIGHT_BLOB_PATH), {
      sentinelFuse: 'NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2',
      machoSegmentName: process.platform === 'darwin' ? 'NODE_SEA' : undefined,
    });
    console.log('Created executable', nodeBinary);
    await run('chmod', '+x', nodeBinary);
    if (platform.startsWith('darwin')) {
      console.log(`Signing ${nodeBinary}...`);
      await run(
        'rcodesign',
        'sign',
        '--team-name',
        process.env.APPLE_TEAM_ID,
        '--p12-file',
        process.env.APPLE_CERT_PATH,
        '--p12-password',
        process.env.APPLE_CERT_PASSWORD,
        '--for-notarization',
        '-e',
        join(import.meta.dirname, 'entitlements.plist'),
        nodeBinary,
      );
    }
  }),
);
