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
  optional?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, isDirty, error, optional, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles['input-container']}>
          <input
            ref={ref}
            className={clsx(
              styles.input,
              isDirty && styles['input--dirty'],
              error && styles['input--error']
            )}
            type={type}
            id={label}
            autoComplete='on'
            {...props}
          />
          <label htmlFor={label} className={clsx(styles.label, isDirty && styles['label--dirty'])}>
            {label}
            {optional && <span className={styles.optional}>(optional)</span>}
          </label>
        </div>
        {error?.message && <Error message={error.message} />}
      </div>
    );
  }
);
