import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const newPassInputRef = useRef();

  const oldPassInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const newPass = newPassInputRef.current.value;

    const oldPass = oldPassInputRef.current.value;

    props.onChangePassword({ oldPass, newPass });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
