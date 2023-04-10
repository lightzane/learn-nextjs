import Link from 'next/link';
import { useSession, SessionProvider, signOut } from 'next-auth/react';
import classes from './main-navigation.module.css';

function MainNavigation() {
  // Reference: https://next-auth.js.org/getting-started/client#usesession
  // ! [sessionObj, boolean] --> next-auth@3
  // * { data: session, status } --> next-auth@4
  const { data: session, status } = useSession(); // * see also auth-form.js

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status !== 'loading' && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
