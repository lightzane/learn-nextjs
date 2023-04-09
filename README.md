# Unique Topic

Here you will learn about **React Portals**

For example you have a `Notification` component somewhere nested down the element tree. Which is semantically incorrect. So we will implement **React Portals** and put it on the `_document.tsx`

**notification.tsx**

```tsx
// components/ui/notification.tsx
import React from 'react';
...
import ReactDOM from 'react-dom';

export const Notification: React.FC<INotificationData> = (props) => {

  ...

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications') as HTMLDivElement // * see pages/_document.tsx
  );
};
```

Since that is a **React Portal**,

The `<Notification>` component will be attached to the `#notifications` container even though it is being used in the **components/contact/contact-form.tsx**

**\_document.tsx**

```tsx
// _document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="notifications"></div>
      </body>
    </Html>
  );
}
```

## Getting Started

Created using `npx create-next-app learn-nextjs`

```
Need to install the following packages:
  create-next-app@13.3.0
Ok to proceed? (y) y
✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use Tailwind CSS with this project? … No
✔ Would you like to use `src/` directory with this project? … No
✔ Would you like to use experimental `app/` directory with this project? … No
✔ What import alias would you like configured? … myapp/*
```

> Also `npx create-next-app learn-nextjs --typescript` to skip the first question

## Dependencies

This dependency is specific-only to this Blog application

- `react-markdown`
- `gray-matter` - allows splitting of metadata (yaml) and actual markdown content
- `react-syntax-highlighter`

```
npm i react-markdown gray-matter react-syntax-highlighter
```

**dev dependencies**

```
npm i @types/react-syntax-highlighter -D
```

# Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
