import { motion, Variant } from 'framer-motion';
import { useAtom } from 'jotai';
import { UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';

import styles from './buttons.module.scss';

import { charCountAtom } from '@/store/store';

import { FormValues } from '../EditAccount';

type ButtonsProps = {
  disabled: boolean;
  reset: UseFormReset<FormValues>;
};

export const Buttons = ({ disabled, reset }: ButtonsProps) => {
  const { data } = useProfile();
  const [, setCharCount] = useAtom(charCountAtom);

  const handleReset = () => {
    setCharCount(data?.bio?.length ?? 0);
    reset({
      username: isString(data?.username),
      website: isString(data?.website),
      bio: isString(data?.bio),
    });
  };

  const whileTap: Variant = { scale: 0.95 };
  const whileActive: Variant = { scale: 1.05 };

  return (
    <div className={styles.buttons}>
      <motion.button
        whileTap={whileTap}
        type='button'
        onClick={handleReset}
        className={styles.cancel}
      >
        reset
      </motion.button>
      <motion.button
        whileFocus={disabled ? {} : whileActive}
        whileHover={disabled ? {} : whileActive}
        whileTap={disabled ? {} : whileTap}
        type='submit'
        className={styles.submit}
        disabled={disabled}
      >
        confirm changes
      </motion.button>
    </div>
  );
};
