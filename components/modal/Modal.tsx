import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';

import styles from './modal.module.scss';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type ButtonProps = {
  children: ReactNode;
  variant?: 'red';
  onClick?: () => void;
};

type TextProps = {
  children: ReactNode;
};

export const Modal = ({ children, setIsOpen }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (clickEvent: MouseEvent) => {
    if (clickEvent.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  const handleEscape = (keyEvent: KeyboardEvent) => {
    if (keyEvent.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onKeyDown={handleEscape}
      onClick={handleClickOutside}
      className={styles.overlay}
    >
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
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
          {children}
        </motion.div>
      </FocusTrap>
    </div>
  );
};

const Button = ({ children, variant, onClick }: ButtonProps) => {
  return (
    <button
      type='button'
      className={clsx(variant && styles['action--red'], styles.action)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Text = ({ children }: TextProps) => {
  return <p className={styles.text}>{children}</p>;
};

Modal.Button = Button;
Modal.Text = Text;
