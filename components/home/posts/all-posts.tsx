import { IPost } from '../../../shared/interfaces/post.interface';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

interface Props {
  posts: IPost[];
}

export default function AllPosts(props: Props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
