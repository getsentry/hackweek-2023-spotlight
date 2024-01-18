import { Link } from 'react-router-dom';
import { useSentrySpans } from '../../data/useSentrySpans';
import { Span } from '../../types';
import { getFormattedDuration, getFormattedNumber } from '../../utils/duration';

const getDBSpans = (spans: Span[], options: { type?: string; regex?: RegExp }) => {
  if (options.type) {
    return spans.filter((span: Span) => span.description === options.type);
  }
  if (options.regex) {
    const regex = new RegExp(options.regex);
    return spans.filter((span: Span) => regex.test(span.op || ''));
  }
  return [];
};

const calculateQueryTypeInfo = ({ query, spanData }: { query: string; spanData: Span[] }) => {
  const queryTypeData = spanData.filter((span: Span) => span.description === query);
  const times = queryTypeData.map((span: Span) => span.timestamp - span.start_timestamp);
  const totalTimeInMs = times.reduce((acc: number, time: number) => acc + time, 0);
  const avgTime = totalTimeInMs / times.length;
  const queriesPerMinute = (queryTypeData.length / totalTimeInMs) * 60;

  return {
    avgTime,
    totalTime: totalTimeInMs,
    queriesPerMinute: getFormattedNumber(queriesPerMinute),
    type: query,
  };
};

const Queries = ({ showAll }: { showAll: boolean }) => {
  const [allSpans, localSpans] = useSentrySpans();

  const onlyDBSpans = getDBSpans(showAll ? allSpans : localSpans, { regex: /db\.[A-Za-z]+/ });
  let queriesData;
  if (onlyDBSpans.length > 0) {
    const uniqueQueries: string[] = [
      ...new Set(
        onlyDBSpans
          .map(span => span?.description)
          .map(String)
          .filter(query => query.trim() !== ''),
      ),
    ];
    queriesData = uniqueQueries.map(query => calculateQueryTypeInfo({ query, spanData: onlyDBSpans }));
  }

  if (queriesData) {
    return (
      <table className="divide-primary-700 min-w-full divide-y">
        <thead>
          <tr>
            <th scope="col" className="text-primary-100 px-6 py-3.5 text-left text-sm font-semibold">
              Query Type
            </th>
            <th scope="col" className="text-primary-100 px-6 py-3.5 text-right text-sm font-semibold">
              Queries per minute
            </th>
            <th scope="col" className="text-primary-100 px-6 py-3.5 text-right text-sm font-semibold">
              Avg Time
            </th>
            <th scope="col" className="text-primary-100 px-6 py-3.5 text-right text-sm font-semibold">
              Total Time
            </th>
          </tr>
        </thead>
        <tbody>
          {queriesData.map(query => (
            <tr key={query.type} className="hover:bg-primary-900">
              <td className="text-primary-200 whitespace-nowrap px-6 py-4 text-left text-sm font-medium">
                <Link className="truncate hover:underline" to={`/performance/queries/${query.type}`}>
                  {query.type}
                </Link>
              </td>
              <td className="text-primary-200 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                {query.queriesPerMinute}
                {'/min'}
              </td>
              <td className="text-primary-200 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                {getFormattedDuration(query.avgTime)}
              </td>
              <td className="text-primary-200 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                {getFormattedDuration(query.totalTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="text-primary-300 px-6 py-4">
      No Database queries found. Add integration in Sentry initialization to track Database queries.
    </div>
  );
};

export default Queries;
