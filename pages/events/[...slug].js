import { useRouter } from 'next/router';
import ErrorAlert from '../../components/error-alert/error-alert';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import { getFilteredEvents } from '../../dummy.data';

export default function FilteredEventsPage() {
  const router = useRouter();
  const slug = router.query.slug;

  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const [strYear, strMonth] = slug;

  const year = +strYear;
  const month = +strMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    year > 2030 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <ErrorAlert>
        <p className="center">Invalid filter. Please adjust your values</p>
      </ErrorAlert>
    );
  }

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <div className="center">
          <ErrorAlert>
            <p className="center">No events found</p>
          </ErrorAlert>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
