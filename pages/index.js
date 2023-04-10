import StartingPageContent from '../components/starting-page/starting-page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

function HomePage() {
  return <StartingPageContent />;
}

export async function getServerSideProps(context) {
  // ! If this is NULL, try clearing all the cache and hard refresh the browser
  // Reference: https://next-auth.js.org/configuration/nextjs#in-getserversideprops
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
      },
    };
  }

  return {
    props: { session },
    redirect: {
      destination: '/profile',
    },
  };
}

export default HomePage;
