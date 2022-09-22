import clsx from 'clsx';
import { motion, MotionProps } from 'framer-motion';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
} & MotionProps &
  HTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type, disabled, className, ...other }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={disabled ? {} : { scale: 0.94 }}
        whileHover={disabled ? {} : { scale: 1.04 }}
        whileFocus={disabled ? {} : { scale: 1.04 }}
        disabled={disabled}
        className={clsx(className, styles.button)}
        {...other}
      >
        {children}
      </motion.button>
    );
  }
);
