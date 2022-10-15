import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { usePostData } from '@/hooks/posts/usePostData';

import styles from './postFooter.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { PostDescription } from '@/components/molecules/post/postDescription/PostDescription';

type PostFooterProps = {
  id: number;
  showDescription?: boolean;
};

dayjs.extend(relativeTime);

export const PostFooter = ({ id, showDescription }: PostFooterProps) => {
  const { postData } = usePostData(id);

  if (!postData) {
    return <Loader />;
  }

  const {
    created_at,
    _count: { posts_likes },
  } = postData;

  const postDate = dayjs(created_at).format('YYYY/MM/DD');
  const createdAt = dayjs(created_at).fromNow();

  return (
    <footer className={styles.footer}>
      {posts_likes !== 0 && posts_likes && (
        <p className={styles.likes}>
          <span className={styles.bold}>{posts_likes}</span>
          <span>{posts_likes > 1 ? 'likes' : 'like'}</span>
        </p>
      )}
      {showDescription && <PostDescription id={id} />}
      <time dateTime={postDate} className={styles.created}>
        {createdAt}
      </time>
    </footer>
  );
};
