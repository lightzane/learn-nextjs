# Learn NextJS

We will be adding `<Head>` tags in our **HTML**

See `pages/index.js`

```tsx
import Head from 'next/head';

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        ></meta>
      </Head>
      <EventList items={props.events} />
    </div>
  );
}
```

## \_app.js

Or add a generic `<Head>` in the `_app.js` that will be applied to all the components and will be overwritten if there are any same metadata inside each components.

```tsx
// _app.js
import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Generic Title from _app.js</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

## \_document.js

`pages/_document.js` allows you to customize the entire HTML document

```tsx
// _document.js
import Document, { Head, Html, Main, NextScript } from 'next/document';

// * Default structure/template of the entire Next.js app
// export default class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## Optimizing Images

Reference: https://nextjs.org/docs/api-reference/next/image

Since `Next.js` is a **React Framework for Production**, we can optimize the images.

For example the images are in `.jpg` and has large size dimensions.

And we will use **Chrome**, in the **Networks** tab you will see the size of the images when doing **Empty Cache and Hard Reload** (when press and hold the Refresh icon while Developer tools is opened).

Compare the size when using the common `<img>` vs the `<Image>` from **Next.js**

**Next.js** will convert the image to `.webp` for Chrome to optimize the image, and by specifying a width and height, we will have a smaller size even after doing the empty cache and hard reload. Adjusting the width and height can still be trial and error to prevent blurry images.

> The CSS styles for width and height will still kick in. The **width** and **height** in the `<Image>` will be just the dimensions that will be fetched

And you will see it on the build `.next/cache/images`

Examples can be seen in:

- `components/event-detail/event-logistics.js`
- `components/events/event-item.js`

```tsx
import Image from 'next/image';

<Image src={`/${image}`} alt={title} width={250} height={160} />;
```
