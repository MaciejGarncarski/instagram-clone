import clsx from 'clsx';
import { useAtom } from 'jotai';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { BIO_MAX_LENGTH } from '@/utils/editAccountValidation';

import styles from './editInput.module.scss';

import { charCountAtom } from '@/store/store';

import { Label } from './label/Label';

type EditInputProps = {
  label: string;
  error: FieldError | undefined;
  optional?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, EditInputProps>(
  ({ label, error, optional, ...props }, ref) => {
    const [charCount] = useAtom(charCountAtom);

    const countClass = clsx(styles.count, {
      [styles['count--warning']]: charCount >= BIO_MAX_LENGTH * 0.46,
      [styles['count--error']]: charCount >= BIO_MAX_LENGTH * 0.8,
    });

    return (
      <div className={styles['input-container']}>
        <Label label={label} optional={optional} />
        <div className={styles['text-area-container']}>
          <p className={countClass}>
            {charCount ?? 0}/{BIO_MAX_LENGTH}
          </p>
          <div className={styles.gradient}>
            <textarea
              ref={ref}
              className={styles['text-area']}
              maxLength={BIO_MAX_LENGTH}
              id={label}
              {...props}
            />
          </div>
          <p>{error?.message}</p>
        </div>
      </div>
    );
  }
);
