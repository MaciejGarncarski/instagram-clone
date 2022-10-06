import { useAtom } from 'jotai';
import { UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './buttons.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { FormValues } from '@/components/pages/editAccount/EditAccount';

import { charCountAtom } from '@/store/store';

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
      <Button variant='red' type='button' disabled={disabled} onClick={handleReset}>
        reset
      </Button>
      <Button type='submit' disabled={disabled}>
        confirm
      </Button>
    </div>
  );
};
