# Learning Pre-rendering and Data Fetching

**Some data does NOT need to pre-render**

- Data changing with high frequency (e.g. stock data)
- Highly user-specific data (e.g. last orders in an online shop)
- Partial data (e.g. data that's only used as a part of a page)

Observe the following pages:

- `index.js`
- `/products/[pid].js`
- `user-profile.js`
- `/users/[uid].js`

# Contents

**Static Generation**

- [getStaticProps()](#getstaticprops)
- [getStaticProps(context)](#getstaticpropscontext)
- [getStaticPaths()](#getstaticpaths)

**Server-side Rendering**

Needs to pre-render for every request OR needs access to the request object (e.g. cookies)

- [getServerSideProps(context)](#getserversidepropscontext)

**Client-side data fetch**

- [Traditional](#traditional)
- [SWR](#swr)

## getStaticProps()

Can do server things as it is not executed in the client side.

Example found in `index.js`

```tsx
export async function getStaticProps() {
  console.log('(Re-)Generating...'); // will run in Terminal since this is server-side

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true, // return 404 page if no data
    };
  }

  // * always returns an object with `props` key
  return {
    // * from Next.js - `props`
    props: {
      products: data.products,
    },
    // * from Next.js - regenerate on user request if more than 10 secs than it was last generated
    // ISR - Incremental Static Regeneration
    revalidate: 10, // matters in prod deployment (e.g `npm start` (after npm run build) - NOT npm run dev)
  };
}
```

## getStaticProps(context)

Usually used with dynamic routes and `getStaticPaths()`

Example found in `/products/[pid].js`

```tsx
const { params } = context;

const productId = params.pid;

const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
const jsonData = await fs.readFile(filePath);
const data = JSON.parse(jsonData);

const product = data.products.find((p) => p.id === productId);

return {
  props: {
    loadedProduct: product,
  },
};
```

## getStaticPaths()

We need to tell Next.js how many pages to be pre-rendered for this dynamic routes

Usually used with dynamic routes and `getStaticProps(context)`

Example found in `/products/[pid].js`

```tsx
export async function getStaticPaths() {
  // will be passed to `getStaticProps(context)`
  return {
    paths: [
      {
        params: { pid: 'p1' },
      },
      //   {
      //     params: { pid: 'p2' },
      //   },
      //   {
      //     params: { pid: 'p3' },
      //   },
    ],
    fallback: true,
  };
}
```

`fallback` - is used if there would be a lot of pages to be pre-generated

> pre-generating a lot of pages that are rarely visited is a waste of time and resources <br> That is where `fallback` becomes important

If `/p2` is accessed via `<Link>`, notice it will be successful, but if it is accessed directly via the URL, it will NOT be.

In this case, we **need to set** the `fallback` to true

```tsx
export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    // if not yet ready, Next.js will load a fallback content
    // once ready, Next.js will automatically update the component for you
    return <>Loading...</>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}
```

We can also set the `fallback` to **blocking** to not explictly write a fallback content in the code but it will take more time. It depends on the use-case.

```tsx
export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  const data = await myGetData();
  const ids = data.products.map((p) => p.id);

  // we can also map the object like this to NOT hard-code
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  };
}
```

## getServerSideProps(context)

When you run `npm run build` you will see a `λ` symbol which means that the pages are not pre-generated.

Example found in `user-profile.js`

```tsx
export default function UserProfilePage(props) {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
}

/**
 * Runs for every incoming request.
 * We can have access to the full request object
 */
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'lightzane',
    },
  };
}
```

Another example found in `/users/[uid].js`

```tsx
export default function UserDetailPage(props) {
  return <>Id: {props.id}</>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: `userId-${params.uid}`,
    },
  };
}
```

## Traditional

This is also used in the standard React apps

Example found in `user-profile.js`

```tsx
import { useEffect, useState } from 'react';

export default function GetUsersPage() {
  const [isLoading, setIsLoading] = useState();
  const [users, setUsers] = useState();

  // Client-side data fetching
  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setUsers(data);
      });
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!users) {
    return <>No data...</>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## SWR

`Stale-While-Revalidate` - a React hook

Reference: https://swr.vercel.app

a HTTP cache invalidation strategy popularized by HTTP RFC 5861 (opens in a new tab). SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

```
npm install swr
```

```tsx
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function GetUsersPage() {
  const [isLoading, setIsLoading] = useState();
  const [users, setUsers] = useState();

  // SWR
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsers(data);
    }
  }, [data]);

  if (error) {
    return <>Failed to load...</>;
  }

  if (!data || !users) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
