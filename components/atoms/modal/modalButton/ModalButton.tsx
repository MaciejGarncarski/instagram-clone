import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './modalButton.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

type ButtonProps = Children & {
  variant?: 'red';
  onClick?: () => void;
};

export const ModalButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, onClick }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={clsx(variant && styles['button--red'], styles.button)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
