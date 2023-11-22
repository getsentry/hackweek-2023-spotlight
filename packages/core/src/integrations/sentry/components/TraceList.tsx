import { Link } from 'react-router-dom';
import classNames from '../../../lib/classNames';
import { useSentryTraces } from '../data/useSentryTraces';
import { getDuration } from '../utils/duration';
import PlatformIcon from './PlatformIcon';
import TimeSince from './TimeSince';

export default function TraceList() {
  const traceList = useSentryTraces();

  return (
    <>
      <div className="divide-y divide-indigo-500 bg-indigo-950">
        {traceList.length !== 0 ? (
          traceList.map(trace => {
            const duration = getDuration(trace.start_timestamp, trace.timestamp);
            return (
              <Link
                className="flex cursor-pointer items-center gap-x-4 px-6 py-4 hover:bg-indigo-800"
                key={trace.trace_id}
                to={trace.trace_id}
              >
                <PlatformIcon platform={trace.rootTransaction?.platform} />

                <div className="flex w-48 flex-col truncate font-mono text-indigo-300">
                  <div>{trace.trace_id.substring(0, 8)}</div>
                  <TimeSince date={trace.start_timestamp} />
                </div>
                <div className="flex flex-1 flex-col truncate font-mono">
                  <div>{trace.rootTransactionName}</div>
                  <div className="flex space-x-2 text-sm text-indigo-300">
                    <div className={classNames(trace.status === 'ok' ? 'text-green-400' : 'text-red-400')}>
                      {trace.status || 'unknown'}
                    </div>
                    <div>&mdash;</div>
                    <div>{duration} ms</div>
                    <div>&mdash;</div>
                    <div>
                      {trace.spans.length.toLocaleString()} spans, {trace.transactions.length.toLocaleString()} txns
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-6 text-indigo-300">Looks like there's no traces recorded matching this query. 🤔</div>
        )}
      </div>
    </>
  );
}
