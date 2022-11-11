import clsx from 'clsx';
import { useRef } from 'react';

import { useCloseModal } from '@/hooks/useCloseModal';

import styles from './modalContainer.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

type ModalContainerProps = {
  onClose: () => void;
  className?: string;
  variant?: 'center';
} & Children;

export const ModalContainer = ({ onClose, className, children, variant }: ModalContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleClickOutside } = useCloseModal({ ref: containerRef, onClose });

  return (
    <div
      onClick={handleClickOutside}
      ref={containerRef}
      className={clsx(className, variant && styles[variant], styles.overlay)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
