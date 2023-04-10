import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import classes from './auth-form.module.css';

function AuthForm() {
  const emailInputRef = useRef();

  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  async function submitHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;

    const password = passwordInputRef.current.value;

    if (isLogin) {
      // * signIn() autmatically adds cookies (see also main-navigation.js)
      // signIn(provider, options + object to be passed to `see [...nextauth].js`)
      const result = await signIn('credentials', {
        redirect: false,
        // the object to be passed:
        email,
        password,
      });

      if (!result.error) {
        // set some auth state
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(email, password);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
