import Image from 'next/image';
import { useRouter } from 'next/router';

import { usePostModal } from '@/hooks/posts/usePostModal';

import styles from './singlePost.module.scss';

import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostComment } from '@/components/molecules/post/postComment/PostComment';
import { PostCommentSection } from '@/components/molecules/post/postCommentSection/PostCommentSection';
import { PostDescription } from '@/components/molecules/post/postDescription/PostDescription';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

export const SinglePost = () => {
  const router = useRouter();

  const postID = typeof router.query.id === 'string' ? Number(router.query.id) : 0;

  const { commentsData, user, postData, currentUser } = usePostModal(postID);

  if (!postData) {
    return null;
  }

  const { author, img } = postData.post;

  const canShowSettings = currentUser?.id === author.id;

  return (
    <div className={styles.container}>
      <PostHeader id={postID} canShowSettings={canShowSettings} />
      <div className={styles.middle}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={700}
            height={700}
            src={img}
            alt={`${author.username}'s post`}
            priority
          />
        </div>
        <aside className={styles.right}>
          <div className={styles.author}>
            <UserAvatar userID={author.id} className={styles.authorAvatar} />
            <PostDescription id={postID} />
          </div>
          <div className={styles.comments}>
            <PostCommentSection id={postID} />
          </div>
          <PostButtons id={postID} />
          <PostFooter id={postID} />
        </aside>
      </div>
      <PostComment className={styles.commentForm} id={postID} />
    </div>
  );
};
