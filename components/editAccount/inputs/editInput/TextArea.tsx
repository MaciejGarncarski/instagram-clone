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

    const progress = Math.round((100 * charCount) / BIO_MAX_LENGTH);

    const progressClass = clsx(styles['progress-container'], {
      [styles['progress-container--warning']]: charCount >= BIO_MAX_LENGTH * 0.46,
      [styles['progress-container--error']]: charCount >= BIO_MAX_LENGTH * 0.8,
    });

    return (
      <div className={styles['input-container']}>
        <Label label={label} optional={optional} />
        <div className={styles['text-area-container']}>
          <div
            className={progressClass}
            style={{
              backgroundImage: `conic-gradient(var(--progress-color) ${progress}%, var(--bg-color) ${progress}%)`,
            }}
          >
            <div className={styles.progress}>{charCount}</div>
          </div>
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
