import { useUser } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';
import Image from 'next/future/image';
import { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

import { unlockScroll } from '@/lib/scrollLock';
import { COMMENTS_PER_SCROLL, useGetComments } from '@/hooks/posts/useGetComments';
import { usePostData } from '@/hooks/posts/usePostData';
import { useProfile } from '@/hooks/profile/useProfile';
import { useCloseModal } from '@/hooks/useCloseModal';

import styles from './postModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostComment } from '@/components/molecules/post/postComment/PostComment';
import { PostCommentSection } from '@/components/molecules/post/postCommentSection/PostCommentSection';
import { PostDescription } from '@/components/molecules/post/postDescription/PostDescription';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostModalProps = {
  id: number;
  setIsOpen: (isOpen: boolean) => void;
};

export const PostModal = ({ id, setIsOpen }: PostModalProps) => {
  const parent = document.querySelector('.post-modal') as HTMLDivElement;
  const overlayRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { data: commentsData, hasNextPage, fetchNextPage } = useGetComments(id);
  const { user } = useUser();
  const { data: currentUser } = useProfile();
  const { data: postData } = usePostData(id);

  const canShowSettings = user?.id === postData?.author_id || currentUser?.role === 'ADMIN';
  const allComments = commentsData?.pages.flatMap((comment) => comment);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    unlockScroll();
  }, [setIsOpen]);

  const { handleClickOutside } = useCloseModal(overlayRef, closeModal);

  const focusInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  if (!commentsData || !allComments || !postData) {
    return null;
  }

  return createPortal(
    <div onClick={handleClickOutside} key={id} ref={overlayRef} className={styles.overlay}>
      <motion.div
        role='dialog'
        className={styles.modal}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.75 }}
      >
        <div className={styles.image}>
          <Image
            sizes='(max-width: 768px) 90vw,
              (max-width: 1200px) 85vw,
              80vw'
            src={postData.img}
            alt='img'
            fill
            priority
          />
        </div>
        <button type='button' className={styles.button} onClick={closeModal}>
          <CancelIcon />
        </button>
        <PostHeader id={id} canShowSettings={canShowSettings} borderBottom />
        <div className={styles.overflow} id='overflow'>
          <div className={styles.description}>
            <UserAvatar userID={postData?.author.id ?? ''} sizes='40' className={styles.avatar} />
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
        <div className={styles.bottom}>
          <PostButtons id={id} commentCallback={focusInput} />
          <PostFooter id={id} />
          <PostComment id={id} ref={commentInputRef} />
        </div>
      </motion.div>
    </div>,
    parent
  );
};
