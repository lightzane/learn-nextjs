import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react';

function ProfilePage() {
  return <UserProfile />;
}

/**
 * ! Next.js function
 */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
