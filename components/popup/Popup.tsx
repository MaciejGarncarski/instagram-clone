import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import styles from './popup.module.scss';

type PopupProps = {
  text: string;
  isError?: boolean;
  handleClose: () => void;
};

export const Popup = ({ text, isError, handleClose }: PopupProps) => {
  const parent = document.querySelector('#popup') as HTMLDivElement;

  return createPortal(
    <motion.div className={styles.gradient} animate={{ y: -100 }}>
      <div className={styles.popup}>
        <button type='button' className={styles['close-btn']} onClick={handleClose}>
          close
        </button>
        <p className={clsx(isError && styles.error, styles.text)}>{text}</p>
      </div>
    </motion.div>,
    parent
  );
};
