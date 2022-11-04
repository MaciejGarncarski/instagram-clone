import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './modalButton.module.scss';

import { ModalItemPosition } from '@/components/atoms/modal/modalLink/ModalLink';
import { Children } from '@/components/organisms/modal/Modal';

type ButtonProps = Children &
  ModalItemPosition & {
    disabled?: boolean;
    variant?: 'red';
    onClick?: () => void;
  };

export const ModalButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, disabled, onClick, isFirst, isLast }, ref) => {
    const handleClick = () => {
      if (!onClick) {
        return;
      }
      onClick();
    };

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsx(
          isFirst && styles['button--first'],
          isLast && styles['button--last'],
          variant && styles['button--red'],
          styles.button
        )}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }
);
