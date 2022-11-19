import { Comments, COMMENTS_PER_SCROLL } from '@/hooks/posts/useGetComments';
import { usePostModal } from '@/hooks/posts/usePostModal';

import styles from './postModalComments.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { PostCommentSection } from '@/components/molecules/post/postCommentSection/PostCommentSection';
import { PostDescription } from '@/components/molecules/post/postDescription/PostDescription';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostModalCommentsProps = {
  id: number;
  allComments: Comments[];
};

export const PostModalComments = ({ id, allComments }: PostModalCommentsProps) => {
  const { postData, fetchNextPage, hasNextPage } = usePostModal(id);

  return (
    <div className={styles.overflow} id='overflow'>
      <div className={styles.description}>
        <UserAvatar userID={postData?.post.author.id ?? ''} className={styles.avatar} />
        <PostDescription id={id} showAll />
      </div>
      {allComments && (
        <>
          <PostCommentSection id={id} />
          {allComments.length >= COMMENTS_PER_SCROLL && (
            <Button
              type='button'
              disabled={!hasNextPage}
              className={styles.fetch}
              onClick={() => fetchNextPage()}
            >
              Load more
            </Button>
          )}
        </>
      )}
    </div>
  );
};
