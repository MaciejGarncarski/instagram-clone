import { motion } from 'framer-motion';
import Image from 'next/future/image';

import styles from './loader.module.scss';

import loadingIMG from '@/images/sync.svg';

type LoaderProps = {
  text?: string;
};

export const Loader = ({ text }: LoaderProps) => {
  return (
    <div className={styles.loader}>
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2 }}>
        <Image src={loadingIMG} alt='loading' className={styles.img} />
      </motion.div>
      <p>{text}</p>
    </div>
  );
};
