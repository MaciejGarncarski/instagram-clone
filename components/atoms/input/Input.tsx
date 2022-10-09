import clsx from 'clsx';
import { forwardRef, useState } from 'react';
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
    const [isShown, setIsShown] = useState<boolean>(false);

    const handleShow = () => setIsShown((prevState) => !prevState);

    return (
      <div className={styles.wrapper}>
        <div className={styles['input-container']}>
          <input
            ref={ref}
            className={clsx(
              styles.input,
              isDirty && styles['input--dirty'],
              error && styles['input--error'],
              isShown && styles['input--padding-right']
            )}
            type={isShown ? 'text' : type}
            id={label}
            {...props}
          />
          <label htmlFor={label} className={clsx(styles.label, isDirty && styles['label--dirty'])}>
            <span className={styles['label-text']}>{label}</span>
            {optional && <span className={styles.optional}>(optional)</span>}
          </label>
          {type === 'password' && (
            <button type='button' className={styles.toggler} onClick={handleShow}>
              {isShown ? 'hide' : 'show'}
            </button>
          )}
        </div>
        {error?.message && <Error message={error.message} />}
      </div>
    );
  }
);
