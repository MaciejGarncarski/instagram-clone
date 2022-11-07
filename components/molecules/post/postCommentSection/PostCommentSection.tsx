import dayjs from 'dayjs';

import { useGetComments } from '@/hooks/posts/useGetComments';

import styles from './postCommentSection.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostCommentSectionProps = {
  id: number;
};

export const PostCommentSection = ({ id }: PostCommentSectionProps) => {
  const { data } = useGetComments(id);
  const allComments = data?.pages.flatMap((comment) => comment);

  if (!allComments || !data) {
    return <Loader />;
  }

  return (
    <ul className={styles.list}>
      {allComments.map(({ comment_text, id, user, user_id, created_at }) => {
        const postDate = dayjs(created_at).format('YYYY/MM/DD');
        const createdAt = dayjs(created_at).fromNow();
        return (
          <li key={id} className={styles.item}>
            <UserAvatar userID={user_id} className={styles.avatar} />
            <span>
              <span className='bold'>{user.username} </span>
              {comment_text}
            </span>
            {/* <time dateTime={postDate}>{createdAt}</time> */}
          </li>
        );
      })}
    </ul>
  );
};
