import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './popup.module.scss';

type PopupProps = {
  children: ReactNode;
  isError?: boolean;
  timeout?: number;
};

export const Popup = ({ children, isError, timeout }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const parent = document.querySelector('.popup') as HTMLDivElement;

  useEffect(() => {
    if (!timeout) {
      return;
    }

    setTimeout(() => {
      setIsVisible(false);
    }, timeout * 1000);
  }, [timeout]);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={clsx(isError && styles.error, styles.popup)}
          animate={{ translateY: 0, opacity: 1 }}
          initial={{ translateY: 50, opacity: 0 }}
          exit={{
            scale: 0.6,
            opacity: 0,
            transition: {
              type: 'tween',
              duration: 0.2,
            },
          }}
        >
          {children}
          {timeout && (
            <motion.div
              animate={{ scaleX: 0, transition: { duration: timeout, type: 'linear' } }}
              initial={{ scaleY: 1 }}
              className={clsx(isError && styles['progress--error'], styles.progress)}
            ></motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    parent
  );
};
