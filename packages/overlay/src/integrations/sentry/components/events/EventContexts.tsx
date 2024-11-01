import { Suspense, lazy } from 'react';
import type { SentryEvent } from '../../types';
import Tags from '../Tags';
const LazyReactJson = lazy(() => import('react-json-view'));

const EXAMPLE_CONTEXT = `Sentry.setContext("character", {
  name: "Mighty Fighter",
  age: 19,
  attack_type: "melee",
});`;

function shouldCollapse({ src, type }: { src: Array<unknown> | object; type: string }) {
  if (type === 'object') return Object.keys(src).length > 10;
  if (type === 'array') return (src as Array<unknown>).length > 10;
  return false;
}

export default function EventContexts({ event }: { event: SentryEvent }) {
  const contextEntries = Object.entries({
    request: event.request,
    extra: {
      modules: event.modules,
      ...(event.extra || {}),
    },
    ...event.contexts,
  }).filter(entry => entry[1]);

  const { tags } = event;

  if (contextEntries.length === 0 && !tags) {
    return (
      <div className="space-y-4 px-6">
        <div className="text-primary-300">
          No context available for this event. Try adding some to make debugging easier.
        </div>
        <pre className="whitespace-pre-wrap ">{EXAMPLE_CONTEXT}</pre>
      </div>
    );
  }
  return (
    <>
      {tags && (
        <div className="pb-4">
          <h2 className="font-bold uppercase">Tags</h2>
          <Tags tags={tags} />
        </div>
      )}
      <div className="space-y-6">
        <Suspense fallback={<div>loading...</div>}>
          {contextEntries.map(([ctxKey, ctxValues]) => (
            <div key={ctxKey}>
              <h2 className="font-bold uppercase">{ctxKey}</h2>
              <table className="w-full">
                <tbody>
                  {ctxValues &&
                    Object.entries(ctxValues).map(([key, value]) => (
                      <tr key={key}>
                        <th className="text-primary-300 w-1/12 py-0.5 pr-4 text-left font-mono font-normal">
                          <div className="w-full truncate">{key}</div>
                        </th>
                        <td className="py-0.5">
                          <pre className="text-primary-300 whitespace-nowrap font-mono">
                            {typeof value !== 'object' || !value ? (
                              value
                            ) : (
                              <LazyReactJson
                                theme="bright"
                                name={null}
                                displayDataTypes={false}
                                quotesOnKeys={false}
                                shouldCollapse={shouldCollapse}
                                src={value}
                              />
                            )}
                          </pre>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </Suspense>
      </div>
    </>
  );
}
