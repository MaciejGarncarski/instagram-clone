import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { usePostModalButtons } from '@/hooks/usePostModalButtons';

import styles from './postSettings.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { DeleteIcon } from '@/components/atoms/icons/DeleteIcon';
import { Input } from '@/components/atoms/input/Input';
import { Modal } from '@/components/organisms/modal/Modal';

type PostSettingsProps = {
  author_id: string;
  id: number;
  img_uuid: string;
};

export const PostSettings = ({ id, img_uuid }: PostSettingsProps) => {
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
    handleDelete(id, img_uuid);
    buttonRef.current.disabled = false;
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
          {isEditing && (
            <>
              <Modal key='editing' variant='big' setIsOpen={setIsEditing}>
                <Modal.Heading>Edit your post</Modal.Heading>
                <Input type='text' label='description' isDirty={false} error={undefined} />
                <Input type='text' label='location' isDirty={false} error={undefined} />
                <div>
                  <Button type='button'>Confirm</Button>
                  <Button type='button' variant='red'>
                    Cancel
                  </Button>
                </div>
              </Modal>
            </>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
