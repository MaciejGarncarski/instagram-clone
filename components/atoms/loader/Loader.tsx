import clsx from 'clsx';

import styles from './loader.module.scss';

type LoaderProps = {
  className?: string;
  variant?: 'white' | 'small';
};

export const Loader = ({ variant, className }: LoaderProps) => {
  return (
    <div className={clsx(styles.loader, variant && styles[variant], className)}>Loading...</div>
  );
};
