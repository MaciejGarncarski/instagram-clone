import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './editInput.module.scss';

type EditInputProps = {
  label: string;
  error: FieldError | undefined;
};

export const TextArea = forwardRef<HTMLTextAreaElement, EditInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={styles['input-container']}>
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
        <textarea ref={ref} className={styles['text-area']} id={label} {...props} />
      </div>
    );
  }
);
