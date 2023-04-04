import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        ></meta>
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

// ! Next.js function
// * We will use `getStaticProps()`
// instead of `getServerSideProps()` since we do not need to revalidate on every request
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    // * This will be passed as `props` in the default function
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // every half-hour will generate this page for a new incoming request
  };
}
