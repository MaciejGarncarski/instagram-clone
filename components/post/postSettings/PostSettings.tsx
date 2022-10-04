import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { usePostModalButtons } from '@/hooks/usePostModalButtons';

import styles from './postSettings.module.scss';

import { Modal } from '@/components/modal/Modal';

type PostSettingsProps = {
  author_id: string;
  id: number;
  img_uuid: string;
};

export const PostSettings = ({ id, img_uuid }: PostSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { buttonData } = usePostModalButtons({ setIsDeleting, setIsOpen });
  const { handleDelete } = useDeletePost();

  const deletePost = () => handleDelete(id, img_uuid);
  const closeDeleteModal = () => setIsDeleting(false);

  return (
    <>
      <aside className={styles.container}>
        <button type='button' className={styles.button} onClick={() => setIsOpen(true)}>
          <span className='sr-only'>settings</span>
          <BsThreeDots />
        </button>
        <AnimatePresence>
          {isOpen && (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              {buttonData.map(({ text, onClick, variant }) => {
                return (
                  <Modal.Button
                    key={text}
                    variant={variant}
                    onClick={onClick ? onClick : () => null}
                  >
                    {text}
                  </Modal.Button>
                );
              })}
            </Modal>
          )}
          {isDeleting && (
            <Modal isOpen={isDeleting} setIsOpen={setIsDeleting}>
              <Modal.Text>Do you really want to remove post?</Modal.Text>
              <Modal.Button onClick={deletePost} variant='red'>
                remove
              </Modal.Button>
              <Modal.Button onClick={closeDeleteModal}>cancel</Modal.Button>
            </Modal>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
