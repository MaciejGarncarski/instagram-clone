import clsx from 'clsx';
import { FieldError, UseFormRegister } from 'react-hook-form';

import styles from './input.module.scss';

import { FormValues } from '../authForm/AuthForm';
import { Error } from '../error/Error';

type InputProps = {
  type: JSX.IntrinsicElements['input']['type'];
  label: 'email' | 'password';
  register: UseFormRegister<FormValues>;
  isDirty: boolean | undefined;
  error: FieldError | undefined;
};

export const Input = ({ type, label, register, isDirty, error }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['input-container']}>
        <input
          className={clsx(styles.input, isDirty && styles['input--active'])}
          type={type}
          id={label}
          {...register(label)}
        />
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      </div>
      {error?.message && <Error message={error.message} />}
    </div>
  );
};
