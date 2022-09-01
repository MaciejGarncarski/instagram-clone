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

    const progress = Math.round((100 * charCount) / BIO_MAX_LENGTH);

    const progressClass = clsx(styles['progress-container'], {
      [styles['progress-container--warning']]: charCount >= BIO_MAX_LENGTH * 0.46,
      [styles['progress-container--error']]: charCount >= BIO_MAX_LENGTH * 0.8,
    });

    return (
      <div className={styles['input-container']}>
        <div className={styles['text-area-container']}>
          <div
            className={progressClass}
            style={{
              backgroundImage: `conic-gradient(var(--progress-color) ${progress}%, var(--bg-color) ${progress}%)`,
            }}
          >
            <div className={styles.progress}>{charCount}</div>
          </div>
          <textarea
            ref={ref}
            className={styles['text-area']}
            maxLength={BIO_MAX_LENGTH}
            id={label}
            {...props}
          />
          <label className={clsx(styles.label, isDirty && styles['label--dirty'])}>
            {label}
            {optional && <span className={styles.optional}>(optional)</span>}
          </label>
          {error?.message && <Error message={error.message} />}
        </div>
      </div>
    );
  }
);
