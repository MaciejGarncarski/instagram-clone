import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { usePostModalButtons } from '@/hooks/posts/usePostModalButtons';

import styles from './postSettings.module.scss';

import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { DeleteIcon } from '@/components/atoms/icons/DeleteIcon';
import { PostEditModal } from '@/components/molecules/modals/postEditModal/PostEditModal';
import { Modal } from '@/components/organisms/modal/Modal';

type PostSettingsProps = {
  author_id: string;
  id: number;
  changeSettingsLayout?: boolean;
};

export const PostSettings = ({ changeSettingsLayout, id }: PostSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { buttonData } = usePostModalButtons({ setIsDeleting, setIsOpen, setIsEditing });
  const { handleDelete } = useDeletePost();

  const deletePost = () => {
    if (!buttonRef.current) {
      return;
    }
    buttonRef.current.disabled = true;
    handleDelete(id);
    buttonRef.current.disabled = false;
  };

  const closeDeleteModal = () => setIsDeleting(false);

  return (
    <>
      <aside className={clsx(changeSettingsLayout ? styles.container : styles.containerMargin)}>
        <button type='button' className={styles.button} onClick={() => setIsOpen(true)}>
          <span className='visually-hidden'>settings</span>
          <BsThreeDots />
        </button>
        <AnimatePresence>
          {isOpen && (
            <Modal setIsOpen={setIsOpen}>
              {buttonData.map(({ text, onClick, variant, icon }, idx) => {
                return (
                  <Modal.Button
                    key={text}
                    variant={variant}
                    isFirst={idx === 0}
                    isLast={idx + 1 === buttonData.length}
                    onClick={onClick ? onClick : () => null}
                  >
                    {icon}
                    {text}
                  </Modal.Button>
                );
              })}
            </Modal>
          )}
          {isDeleting && (
            <Modal setIsOpen={setIsDeleting}>
              <Modal.Text isFirst>Do you really want to remove post?</Modal.Text>
              <Modal.Button ref={buttonRef} onClick={deletePost} variant='red'>
                <DeleteIcon />
                remove
              </Modal.Button>
              <Modal.Button isLast onClick={closeDeleteModal}>
                <CancelIcon />
                cancel
              </Modal.Button>
            </Modal>
          )}
          {isEditing && <PostEditModal setIsEditing={setIsEditing} postID={id} />}
        </AnimatePresence>
      </aside>
    </>
  );
};
