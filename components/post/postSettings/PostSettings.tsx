import { MouseEvent, useRef, useState } from 'react';

import styles from './postSettings.module.scss';

type PostSettingsProps = {
  author_id: string;
  id: number;
  img_uuid: string;
};

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { BsThreeDots } from 'react-icons/bs';

import { useDeletePost } from '@/hooks/posts/useDeletePost';

type ButtonData = {
  text: string;
  onClick?: () => void;
  variant?: 'red';
};

export const PostSettings = ({ author_id, id, img_uuid }: PostSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleDelete } = useDeletePost();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const deletePost = () => {
    handleDelete(id, img_uuid);
  };

  const overlayRef = useRef<HTMLDivElement>(null);

  const buttonData: Array<ButtonData> = [
    {
      text: 'remove',
      variant: 'red',
      onClick: deletePost,
    },
    {
      text: 'edit',
    },
    {
      text: 'cancel',
      onClick: closeMenu,
    },
  ];

  const handleClickOutside = (clickEvent: MouseEvent) => {
    if (clickEvent.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <aside className={styles.container}>
        <button type='button' className={styles.button} onClick={() => setIsOpen(true)}>
          <span className='sr-only'>settings</span>
          <BsThreeDots />
        </button>
        <AnimatePresence>
          {isOpen && (
            <div ref={overlayRef} onClick={handleClickOutside} className={styles.overlay}>
              <motion.div
                role='dialog'
                className={styles.modal}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0 }}
              >
                {buttonData.map(({ text, onClick, variant }) => {
                  return (
                    <button
                      type='button'
                      key={text}
                      onClick={onClick ? onClick : () => null}
                      className={clsx(variant && styles['action--red'], styles.action)}
                    >
                      {text}
                    </button>
                  );
                })}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
