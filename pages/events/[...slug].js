import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ErrorAlert from '../../components/error-alert/error-alert';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import Head from 'next/head';

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const slug = router.query.slug; // came from the "slug" in [...slug].js

  const { data, error } = useSWR(
    'https://lightzane-db.onrender.com/nextjs',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setLoadedEvents(data);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All filtered events`}></meta>
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const [strYear, strMonth] = slug;

  const year = +strYear;
  const month = +strMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${month}/${year}`}
      ></meta>
    </Head>
  );

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  // if (props.hasError) { // from SSR (server-side rendering) - see below in getServerSideProps
  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    year > 2030 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your values</p>
        </ErrorAlert>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
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
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// ! Next.js function
// This option is better since there is a lot of combination of pages
// ! But in this scenario, client-data fetching also fits in where it is not important for this to be crawled by search engines
// Client-side data fetching will also be quicker (npm install swr)
// export async function getServerSideProps(context) {
//   // Also called SSR or server-side prerendering
//   const { params } = context;

//   const [strYear, strMonth] = params.slug; // came from the "slug" in [...slug].js

//   const year = +strYear;
//   const month = +strMonth;

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year < 2021 ||
//     year > 2030 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // * Other alternatives:
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       filteredEvents,
//       date: { year, month },
//     },
//   };
// }
