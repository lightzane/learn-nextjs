import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * ! Next.js function
 * Can do server things as it is not executed in the client side
 * @function `getStaticProps()` is a **Next.js** function
 * @return { props, revalidate, notFound, redirect: { destination } }`
 */
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

export default HomePage;
