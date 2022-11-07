import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BsCaretLeftFill } from 'react-icons/bs';

import styles from './goBackButton.module.scss';

export const GoBackButton = () => {
  const router = useRouter();
  return (
    <motion.button onClick={() => router.back()} className={styles.button} type='button'>
      <BsCaretLeftFill />
      Back
    </motion.button>
  );
};
