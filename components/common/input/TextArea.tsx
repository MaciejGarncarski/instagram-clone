import clsx from 'clsx';
import { useAtom } from 'jotai';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { BIO_MAX_LENGTH } from '@/utils/editAccountValidation';

import styles from './input.module.scss';

import { charCountAtom } from '@/store/store';

import { Error } from './error/Error';

type EditInputProps = {
  label: string;
  error: FieldError | undefined;
  optional?: boolean;
  isDirty: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, EditInputProps>(
  ({ label, error, optional, isDirty, ...props }, ref) => {
    const [charCount] = useAtom(charCountAtom);

    return (
      <div className={styles['input-container']}>
        <div className={styles['text-area-container']}>
          <div className={styles.progress}>
            {charCount} / {BIO_MAX_LENGTH}
          </div>
          <textarea
            ref={ref}
            className={styles['text-area']}
            maxLength={BIO_MAX_LENGTH}
            id={label}
            {...props}
          />
          <label htmlFor={label} className={clsx(styles.label, isDirty && styles['label--dirty'])}>
            <span className={styles['label-text']}>{label}</span>
            {optional && <span className={styles.optional}>(optional)</span>}
          </label>
          {error?.message && <Error message={error.message} />}
        </div>
      </div>
    );
  }
);
