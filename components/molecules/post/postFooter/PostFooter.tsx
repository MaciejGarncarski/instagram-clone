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
  const { data: postData } = usePostData(id);

  if (!postData) {
    return <Loader />;
  }

  const {
    created_at,
    _count: { posts_likes },
  } = postData.post;

  const postDate = dayjs(created_at).format('YYYY/MM/DD');
  const createdAt = dayjs(created_at).fromNow();

  return (
    <footer className={styles.footer}>
      {showDescription && <PostDescription id={id} />}
      <time dateTime={postDate} className={styles.created}>
        {createdAt}
      </time>
    </footer>
  );
};
