import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/future/image';

import styles from './loader.module.scss';

import loadingIMG from '@/images/sync.svg';

type LoaderProps = {
  text?: string;
  className?: string;
};

export const Loader = ({ text, className }: LoaderProps) => {
  return (
    <div className={clsx(className, styles.loader)}>
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2 }}>
        <Image src={loadingIMG} alt='loading' className={styles.img} />
      </motion.div>
      <p>{text}</p>
    </div>
  );
};
