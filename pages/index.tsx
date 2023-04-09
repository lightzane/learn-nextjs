import { GetStaticProps } from 'next';
import FeaturedPosts from '../components/home/featured-posts';
import Hero from '../components/home/hero';
import { getFeaturedPosts } from '../helpers/posts.util';
import { IPost } from '../shared/interfaces/post.interface';
import Head from 'next/head';

// export const DUMMY_POSTS: IPost[] = [
//   {
//     title: 'Getting Started with Next.js',
//     image: 'next.svg',
//     date: '2022-02-10',
//     excerpt:
//       'NextJS is a React framework for production - it makes building full-stack React apps and sites a breeze and ships with built-in SSR.',
//     slug: 'getting-started-with-nextjs',
//     content: '# This is a first post',
//   },
// ];

interface Props {
  posts: IPost[];
}

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Lightzane Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        ></meta>
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

/**
 * ! Next.js function
 */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};
