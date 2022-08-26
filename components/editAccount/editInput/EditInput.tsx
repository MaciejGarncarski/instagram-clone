import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './editInput.module.scss';

type EditInputProps = {
  type?: JSX.IntrinsicElements['input']['type'];
  label: string;
  error: FieldError | undefined;
};

type Ref = HTMLInputElement;

export const EditInput = forwardRef<Ref, EditInputProps>(
  ({ type, error, label, ...props }, ref) => {
    return (
      <div className={styles['input-container']}>
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
        <input
          ref={ref}
          className={clsx(error && styles['input--active'], styles.input)}
          type={type}
          id={label}
          {...props}
        />
      </div>
    );
  }
);
