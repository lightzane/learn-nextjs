import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import Head from 'next/head';

export default function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}></meta>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

// ! Next.js function
// We will use this since the data we want to pre-render will not change over time
// and we want it to be crawlable with search engines
// and has no user-specific data
export async function getStaticProps(context) {
  const { eventId } = context.params; // from [eventId].js
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

// ! Next.js function
// This is always needed for a dynamic page
// usually used with `getStaticProps(context)`
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true, // required to be `true` if only pre-render partial data
    // telling Next.js that there is more pages to be generated
  };
}
