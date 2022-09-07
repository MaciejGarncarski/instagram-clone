import { motion, MotionProps } from 'framer-motion';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
} & MotionProps &
  HTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type, disabled, ...other }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={disabled ? {} : { scale: 0.93 }}
        whileHover={disabled ? {} : { scale: 1.07 }}
        whileFocus={disabled ? {} : { scale: 1.07 }}
        disabled={disabled}
        {...other}
      >
        {children}
      </motion.button>
    );
  }
);
