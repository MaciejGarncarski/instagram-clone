import { useAtom } from 'jotai';
import { UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';

import styles from './buttons.module.scss';

import { Button } from '@/components/common/Button';

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

  return (
    <div className={styles.buttons}>
      <Button className={styles.cancel} type='button' onClick={handleReset}>
        reset
      </Button>
      <Button type='submit' onClick={handleReset} className={styles.submit} disabled={disabled}>
        confirm changes
      </Button>
    </div>
  );
};
