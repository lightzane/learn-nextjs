import { IPost } from '../../../shared/interfaces/post.interface';
import classes from './posts-grid.module.css';
import PostItem from './post-item';

interface Props {
  posts: IPost[];
}

export default function PostGrid(props: Props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
