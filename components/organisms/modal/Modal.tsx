import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';

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
          initialFocus: false,
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

Modal.Link = ModalLink;
Modal.Button = ModalButton;
Modal.Text = ModalText;
