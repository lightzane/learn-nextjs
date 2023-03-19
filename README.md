# Learning Nextjs

# Contents

1. [File-based routing](#file-based-routing)
2. [Link Navigation](#link-navigation)
3. [Navigating Programatically](#navigating-programatically)
4. [Custom 404 Page]

## File-based routing

Here are examples below.

The first line will be the file-structure that contains foldernames and filenames.

And below it is a `->` on how we can access it in the browser where `{app}` is equal to `http://localhost:3000` for example.

### Static route

Without parameters or queries.

```
pages/index.js
-> {app}/

pages/about.js
-> {app}/about

pages/subfolder/index.js
-> {app}/subfolder

pages/subfolder/another.js
-> {app}/subfolder/another
```

### Dynamic route

With parameters and queries

```
pages/portfolio/[portfolioId].js
-> {app}/portfolio/[portfolioId]

pages/clients/[id]/index.js
-> {app}/clients/[id]

pages/clients/[id]/[selected].js
-> {app}/clients/[id]/[selected]
```

### Access Route Query

Example route: `http://localhost:3000/portfolio/myid`

Filepath: `pages/portfolio/[portfolioId].js`

```tsx
import { useRouter } from 'next/router';

export default function PortfolioId() {
  const router = useRouter();

  const query = router.query;

  console.log(router.pathname); // -> /portfolio/[portfolioId]
  console.log(query); // {portfolioId: 'myid'}

  return (
    <div>
      <h1>PortfolioId</h1>
      <p>You are looking for: {query.portfolioId}</p>
    </div>
  );
}
```

### Catch-All Routes

This is useful if you have multiple route segments but still want to use only one file for it. In this case, we will include a spread operator in the filename. `[...slug].js`

```
pages/blog/[...slug].js
-> {app}/blog/2023/03/13
```

```ts
console.log(router.query); // -> { slug: ['2023', '03', '13'] }

// more example:
// http://localhost:3000/blog/whatever/you/want
console.log(router.query); // -> { slug: ['whatever', 'you', 'want'] }
```

## Link Navigation

### Without Query or parameters

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="about">About</Link>
        </li>
        <li>
          <Link href="clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}
```

### With Query or parameters

```tsx
import Link from "next/link";

export default function ClientProject() {

    const clients = [
        { id: 'sun', name: 'Our Sun' },
        { id: 'moon', name: 'Our Moon' }
    ]

    return (
        <div>
            <h1>Client Page</h1>
            <ul>
                { clients.map((client)=>(
                    <li key={client.id}>
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: { id: client.id }
                        }}>{client.name}</Link>
                    </li>
                )) }
            </ul>
        </div>
    )
}
```

## Navigating Programatically

```tsx
import { useRouter } from "next/router";

export default function ClientProject() {

    const router = useRouter()

    const query = router.query

    function loadProjectHandler() {
        // load data...
        router.push(`/clients/${query.id}/project-a`) // -> user can use back button to go to previous page
        // router.replace(`/clients/${query.id}/project-a`) // -> does not record history and cannot go back after navigation
    }

    return (
        <div>
            <h1>The Projects of a Given Client</h1>
            <button onClick={loadProjectHandler}>Load {query.id.toUpperCase()} Project A</button>
        </div>
    )
}
```

## Custom 404 Page

Just add exact file name at the exact path `pages/404.js`

```tsx
// pages/404.js
export default function NotFoundPage() {
    return <div>
        <h1>PAGE NOT FOUND</h1>
    </div>
}
```