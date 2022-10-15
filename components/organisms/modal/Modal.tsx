import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import { useCloseModal } from '@/hooks/useCloseModal';

import styles from './modal.module.scss';

import { ModalButton } from '@/components/atoms/modal/modalButton/ModalButton';
import { modalHeading } from '@/components/atoms/modal/modalHeading/modalHeading';
import { ModalLink } from '@/components/atoms/modal/modalLink/ModalLink';
import { ModalText } from '@/components/atoms/modal/modalText/ModalText';

export type Children = {
  children: ReactNode;
};

type ModalProps = Children & {
  variant?: 'big' | 'post';
  setIsOpen: (isOpen: boolean) => void;
};

export const Modal = ({ children, setIsOpen, variant }: ModalProps) => {
  const parent = document.querySelector('.modal') as HTMLDivElement;
  const overlayRef = useRef<HTMLDivElement>(null);

  lockScroll();

  const closeModal = () => {
    setIsOpen(false);
    unlockScroll();
  };

  const { handleClickOutside } = useCloseModal(overlayRef, closeModal);

  return createPortal(
    <div onClick={handleClickOutside} ref={overlayRef} className={styles.overlay} tabIndex={0}>
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        <motion.div
          role='dialog'
          className={clsx(styles[`modal--${variant}`], styles.modal)}
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
Modal.Heading = modalHeading;
