import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { usePostModalButtons } from '@/hooks/usePostModalButtons';

import styles from './postSettings.module.scss';

import { Modal } from '@/components/organisms/modal/Modal';

type PostSettingsProps = {
  author_id: string;
  id: number;
  img_uuid: string;
};

export const PostSettings = ({ id, img_uuid }: PostSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { buttonData } = usePostModalButtons({ setIsDeleting, setIsOpen });
  const { handleDelete } = useDeletePost();

  const deletePost = () => {
    if (!buttonRef.current) {
      return;
    }
    buttonRef.current.disabled = true;
    handleDelete(id, img_uuid);
  };
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
            <Modal setIsOpen={setIsOpen}>
              {buttonData.map(({ text, onClick, variant, icon }) => {
                return (
                  <Modal.Button
                    key={text}
                    variant={variant}
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
              <Modal.Text>Do you really want to remove post?</Modal.Text>
              <Modal.Button ref={buttonRef} onClick={deletePost} variant='red'>
                <BiTrash />
                remove
              </Modal.Button>
              <Modal.Button onClick={closeDeleteModal}>
                <CgClose />
                cancel
              </Modal.Button>
            </Modal>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
