import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

import { ModalButton } from '@/components/atoms/modal/modalButton/ModalButton';
import { ModalLink } from '@/components/atoms/modal/modalLink/ModalLink';
import { ModalText } from '@/components/atoms/modal/modalText/ModalText';

export type Children = {
  children: ReactNode;
};

type ModalProps = Children & {
  setIsOpen: (isOpen: boolean) => void;
};

export const Modal = ({ children, setIsOpen }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const parent = document.querySelector('.modal') as HTMLDivElement;

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

  return createPortal(
    <div
      onKeyDown={handleEscape}
      ref={overlayRef}
      onClick={handleClickOutside}
      className={styles.overlay}
      tabIndex={0}
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
    </div>,
    parent
  );
};

Modal.Link = ModalLink;
Modal.Button = ModalButton;
Modal.Text = ModalText;
