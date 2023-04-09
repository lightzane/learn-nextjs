import Image from 'next/image';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula'; // need to import from "cjs" instead of `esm`
import { IPost } from '../../../../shared/interfaces/post.interface';
import classes from './post-content.module.css';
import PostHeader from './post-header';

interface Props {
  post: IPost;
}

SyntaxHighlighter.registerLanguage('js', js);

export const PostContent: React.FC<Props> = (props) => {
  const post = props.post;

  if (!post.content) return <>Loading...</>;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  /** This is the implementation in react-markdown@8.0.6 */
  const customComponents = {
    // TODO: Look for the correct type-annotation for the `img` instead of `any`
    // img: (img: any) => {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${img.src}`}
    //       alt={img.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },

    // TODO: Look for the correct type-annotation for the `p` instead of `any`
    p: (paragraph: any) => {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const img = node.children[0];

        const { src, alt } = img.properties;

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${src}`}
              alt={alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <div>{paragraph.children}</div>;
    },

    // TODO: Look for the correct type-annotation for the `code` instead of `any`
    code: (code: any) => {
      const { className, node } = code;

      // When watching the course, these were the properties under the `code` entity
      const language = className?.replace(/language-/i, '');
      const value = node.children[0].value;

      return (
        <SyntaxHighlighter
          style={dracula}
          language={language}
          children={value}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
};
