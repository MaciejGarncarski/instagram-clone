import { motion } from 'framer-motion';
import Image from 'next/future/image';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { usePostModal } from '@/hooks/usePostModal';

import styles from './postModal.module.scss';

import { CloseModalButton } from '@/components/atoms/closeModalButton/CloseModalButton';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostComment } from '@/components/molecules/post/postComment/PostComment';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { PostModalComments } from '@/components/molecules/postModalComments/PostModalComments';

type PostModalProps = {
  id: number;
  setIsOpen: (isOpen: boolean) => void;
};

export const PostModal = ({ id, setIsOpen }: PostModalProps) => {
  const parent = document.querySelector('.post-modal') as HTMLDivElement;
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { commentsData, user, postData, currentUser } = usePostModal(id);

  const canShowSettings = user?.id === postData?.author_id || currentUser?.role === 'ADMIN';
  const allComments = commentsData?.pages.flatMap((comment) => comment);

  const closeModal = () => {
    setIsOpen(false);
  };

  const focusInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  if (!commentsData || !allComments || !postData) {
    return null;
  }

  return createPortal(
    <ModalContainer onClose={closeModal}>
      <motion.div
        role='dialog'
        className={styles.modal}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.75 }}
      >
        <div className={styles.image}>
          <Image width={700} height={700} src={postData.img} alt='img' priority />
        </div>
        <CloseModalButton handleClose={closeModal} />
        <PostHeader id={id} canShowSettings={canShowSettings} borderBottom />
        <PostModalComments id={id} allComments={allComments} />
        <div className={styles.bottom}>
          <PostButtons id={id} commentCallback={focusInput} />
          <PostFooter id={id} />
          <PostComment id={id} ref={commentInputRef} />
        </div>
      </motion.div>
    </ModalContainer>,
    parent
  );
};
