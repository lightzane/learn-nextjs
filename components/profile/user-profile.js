import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // * Not necessary if already using guard in the `getServerSideProps(context)` - see profile.js
  // // Redirect away if NOT auth
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
