import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  children: ReactNode;
  acceptText: string;
  cancelText: string;
  onAccept: () => void;
  onCancel: () => void;
};

const buttonAnimation: Variants = {
  onHover: {
    scale: 1.1,
  },
  onTap: {
    scale: 0.9,
  },
};

const btnProps = {
  variants: buttonAnimation,
  whileHover: 'onHover',
  whileFocus: 'onHover',
  whileTap: 'onTap',
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
        <motion.button
          ref={closeBtnRef}
          {...btnProps}
          className={clsx(styles.button, styles.cancel)}
          type='button'
          onClick={onCancel}
        >
          {cancelText}
        </motion.button>
        <motion.button
          {...btnProps}
          className={clsx(styles.button, styles.accept)}
          type='button'
          onClick={onAccept}
        >
          {acceptText}
        </motion.button>
      </motion.div>
    </div>,
    parent
  );
};
