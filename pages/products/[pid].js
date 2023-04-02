import path from 'path';
import fs from 'fs/promises';

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

async function myGetData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

/**
 * ! Next.js function
 * Can do server things as it is not executed in the client side
 * @function `getStaticProps()` is a **Next.js** function
 * @param context also works like the `useRouter()` but happens in the server
 * @return { props }
 */
export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await myGetData();

  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

/**
 * ! Next.js function
 * ! We need to tell Next.js how many pages to be pre-rendered for this dynamic routes
 * Try running `npm run build`
 */
export async function getStaticPaths() {
  const data = await myGetData();
  const ids = data.products.map((p) => p.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  // will be passed to `getStaticProps(context)`
  return {
    paths: pathsWithParams,
    fallback: true, // is used if there would be a lot of pages to be pre-generated
    // pre-generating a lot of pages that are rarely visited is a waste of time and resources
    // only if we want to pre-render partial pages

    // so if clicking on <Link> on /p2 --- it will be successful
    // BUT if going directly on that page --- notice it will NOT be, so we will need to handle it like:
    // if (!loadedProduct) { return <>Loading...</> }
  };
}
