import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

import { Button } from '../common/button/Button';

type ModalProps = {
  children: ReactNode;
  acceptText: string;
  cancelText: string;
  onAccept: () => void;
  onCancel: () => void;
};

export const Modal = ({ children, onAccept, onCancel, acceptText, cancelText }: ModalProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const parent = document.querySelector('.modal') as HTMLDivElement;

  useEffect(() => {
    if (!closeBtnRef.current) {
      return;
    }
    closeBtnRef.current.focus();
  }, []);

  return createPortal(
    <div className={styles.overlay}>
      <motion.div
        role='modal'
        key='modal'
        className={styles.modal}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 200, opacity: 0 }}
        exit={{
          scale: 0.6,
          opacity: 0,
          transition: {
            type: 'tween',
            duration: 0.2,
          },
        }}
        transition={{ type: 'spring' }}
      >
        {children}
        <div className={styles.buttons}>
          <Button
            ref={closeBtnRef}
            className={clsx(styles.button, styles.cancel)}
            type='button'
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button className={clsx(styles.button, styles.accept)} type='button' onClick={onAccept}>
            {acceptText}
          </Button>
        </div>
      </motion.div>
    </div>,
    parent
  );
};
