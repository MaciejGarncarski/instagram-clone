import clsx from 'clsx';

import styles from './modalButton.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

type ButtonProps = Children & {
  variant?: 'red';
  onClick?: () => void;
};

export const ModalButton = ({ children, variant, onClick }: ButtonProps) => {
  return (
    <button
      type='button'
      className={clsx(variant && styles['button--red'], styles.button)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
