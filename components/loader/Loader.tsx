import clsx from 'clsx';

import styles from './loader.module.scss';

type LoaderProps = {
  className?: string;
  variant?: 'white';
};

export const Loader = ({ variant, className }: LoaderProps) => {
  return (
    <div className={clsx(className && className, styles.loader)}>
      <svg className={styles['circular-loader']} viewBox='25 25 50 50'>
        <circle
          className={clsx(
            variant === 'white' && styles['loader-path--white'],
            styles['loader-path']
          )}
          cx='50'
          cy='50'
          r='20'
          fill='none'
        ></circle>
      </svg>
    </div>
  );
};
