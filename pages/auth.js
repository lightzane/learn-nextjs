import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
