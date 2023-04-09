import { IPost } from '../../shared/interfaces/post.interface';
import classes from './featured-posts.module.css';
import PostGrid from './posts/posts-grid';

interface Props {
  posts: IPost[];
}

export default function FeaturedPosts(props: Props) {
  return (
    <section className={classes.latest}>
      <h2>Feature Posts</h2>
      <PostGrid posts={props.posts} />
    </section>
  );
}
