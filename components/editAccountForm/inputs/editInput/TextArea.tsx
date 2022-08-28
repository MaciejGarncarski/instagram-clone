import clsx from 'clsx';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { BIO_MAX_LENGTH } from '@/utils/editAccountValidation';

import styles from './editInput.module.scss';

import { Label } from './label/Label';

type EditInputProps = {
  label: string;
  error: FieldError | undefined;
  charCount: number | undefined;
  optional?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, EditInputProps>(
  ({ label, error, charCount, optional, ...props }, ref) => {
    const charNumber = typeof charCount === 'number' ? charCount : 0;

    const countClass = clsx(styles.count, {
      [styles['count--warning']]: charNumber > 90,
      [styles['count--error']]: charNumber > 110,
    });

    return (
      <div className={styles['input-container']}>
        <Label label={label} optional={optional} />
        <div className={styles['text-area-container']}>
          <p className={countClass}>
            {charCount ?? 0}/{BIO_MAX_LENGTH}
          </p>
          <textarea
            ref={ref}
            className={styles['text-area']}
            maxLength={BIO_MAX_LENGTH}
            id={label}
            {...props}
          />
          <p>{error?.message}</p>
        </div>
      </div>
    );
  }
);
