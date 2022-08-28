import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './editInput.module.scss';

import { Label } from './label/Label';

type EditInputProps = {
  type?: JSX.IntrinsicElements['input']['type'];
  label: string;
  optional?: boolean;
  error: FieldError | undefined;
};

type Ref = HTMLInputElement;

export const EditInput = forwardRef<Ref, EditInputProps>(
  ({ type, error, label, optional, ...props }, ref) => {
    return (
      <div className={styles['input-container']}>
        <Label label={label} optional={optional} />
        <input
          ref={ref}
          className={clsx(error && styles['input--active'], styles.input)}
          type={type}
          id={label}
          {...props}
        />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    );
  }
);
