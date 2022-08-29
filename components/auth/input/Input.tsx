import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './input.module.scss';

import { Error } from './error/Error';

type InputProps = {
  type?: JSX.IntrinsicElements['input']['type'];
  label: string;
  isDirty: boolean | undefined;
  error: FieldError | undefined;
  variant?: 'text-area';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, isDirty, error, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles['input-container']}>
          <div className={styles.gradient}>
            <input
              ref={ref}
              className={clsx(styles.input, isDirty && styles['input--active'])}
              type={type}
              id={label}
              autoComplete='on'
              {...props}
            />
            <label htmlFor={label} className={styles.label}>
              {label}
            </label>
          </div>
        </div>
        {error?.message && <Error message={error.message} />}
      </div>
    );
  }
);
