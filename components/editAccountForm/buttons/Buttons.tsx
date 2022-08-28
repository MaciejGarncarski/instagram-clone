import { UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';

import styles from './buttons.module.scss';

import { EditValues } from '../EditAccountForm';

type ButtonsProps = {
  disabled: boolean;
  reset: UseFormReset<EditValues>;
};

export const Buttons = ({ disabled, reset }: ButtonsProps) => {
  const { data } = useProfile();

  const handleReset = () => {
    reset({
      username: isString(data?.username),
      website: isString(data?.website),
      bio: isString(data?.bio),
    });
  };

  return (
    <div className={styles.buttons}>
      <button type='button' onClick={handleReset} className={styles.cancel}>
        reset
      </button>
      <button type='submit' className={styles.submit} disabled={disabled}>
        confirm changes
      </button>
    </div>
  );
};
