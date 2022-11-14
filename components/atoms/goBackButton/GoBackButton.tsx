import { useRouter } from 'next/router';
import { BsCaretLeftFill } from 'react-icons/bs';

import styles from './goBackButton.module.scss';

import { Button } from '@/components/atoms/button/Button';

export const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button
      whileHover={{ scale: 1.05 }}
      onClick={() => router.back()}
      className={styles.button}
      type='button'
      variant='gradient'
    >
      <BsCaretLeftFill />
      Back
    </Button>
  );
};
