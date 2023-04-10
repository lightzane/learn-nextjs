# Next Auth

The version used for this is app is `next-auth@4`

Reference: https://next-auth.js.org/

- https://next-auth.js.org/getting-started/example

```
npm install next-auth@
```

For encrypting password

```
npm install bcryptjs
```

## Observe the following files

**Encrypting the password**

- pages/api/auth/`signup.js`

**Verify Password and `NextAuth` Setup**

- pages/api/auth/`[...nextauth].js`

**Handle LOGIN and SIGNIN**

- components/auth/`auth-form.js`
- pages/`_app.js`

**Handle Logout**

- components/layout/`main-navigation.js`

**Sample Client-side guard route if not logged-in**

- components/profile/`user-profile.js`

**Server-side guard route if not logged-in**

- pages/`profile.js`

**Change Password Logic**

- components/profile/`profile-form.js`
- components/profile/`user-profile.js`

## Session

1. The session is automatically populated in the browser when using the `signIn()` from **next-auth/react**.

2. We must setup a `SessionProvider` in **\_app.js** so the session will be available throughout the application via `getSession()` and `getServerSession()`

**References**:

- https://next-auth.js.org/configuration/nextjs#in-getserversideprops
- https://next-auth.js.org/configuration/nextjs#in-api-routes
- https://next-auth.js.org/getting-started/client#usesession
- https://next-auth.js.org/getting-started/client#sessionprovider
