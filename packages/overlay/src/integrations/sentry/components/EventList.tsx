import { Link } from 'react-router-dom';
import CardList from '~/components/CardList';
import { useSentryEvents } from '../data/useSentryEvents';
import { SentryEvent } from '../types';
import { EventSummary } from './Events/Event';
import PlatformIcon from './PlatformIcon';
import TimeSince from './TimeSince';

function renderEvent(event: SentryEvent) {
  return <EventSummary event={event} />;
}

export default function EventList() {
  const events = useSentryEvents();

  const matchingEvents = events.filter(e => e.type !== 'transaction');

  return matchingEvents.length !== 0 ? (
    <CardList>
      {matchingEvents.map(e => {
        return (
          <Link
            className="hover:bg-primary-900 flex cursor-pointer items-center gap-x-4 px-6 py-4"
            key={e.event_id}
            to={e.event_id}
          >
            <PlatformIcon event={e} className="text-primary-300" />
            <div className="text-primary-300 flex w-48 flex-col truncate font-mono">
              <span>{(e.event_id || '').substring(0, 8)}</span>
              <TimeSince date={e.timestamp} />
            </div>
            <div className="flex-1">{renderEvent(e)}</div>
          </Link>
        );
      })}
    </CardList>
  ) : (
    <div className="text-primary-300 p-6">Looks like there's no events recorded matching this query. 🤔</div>
  );
}
