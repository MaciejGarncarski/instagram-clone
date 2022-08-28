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
        <div className={clsx(error && styles['gradient--error'], styles.gradient)}>
          <input ref={ref} className={styles.input} type={type} id={label} {...props} />
        </div>
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    );
  }
);
