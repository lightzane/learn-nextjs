import { GetStaticProps } from 'next';
import AllPosts from '../../components/home/posts/all-posts';
import { getAllPosts } from '../../helpers/posts.util';
import { IPost } from '../../shared/interfaces/post.interface';
import Head from 'next/head';

interface Props {
  posts: IPost[];
}

export default function AllPostsPage(props: Props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        ></meta>
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
