import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { PostContent } from '../../components/home/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../helpers/posts.util';
import { IPost, IPostParams } from '../../shared/interfaces/post.interface';
import Head from 'next/head';

interface Props {
  post: IPost;
}

export default function PostDetailPage(props: Props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt}></meta>
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

/**
 * ! Next.js function
 */
export const getStaticProps: GetStaticProps<Props> = (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as IPostParams;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

/**
 * ! Next.js function
 */
export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    // paths: [
    //   {
    //     params: {
    //       slug: '',
    //     },
    //   },
    // ],
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
