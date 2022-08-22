import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './heading.module.scss';

type HeadingProps = {
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: ReactNode | ReactNode[];
};

export const Heading = ({ size, className, children }: HeadingProps) => {
  const Tag = size;

  return <Tag className={clsx(styles.heading, className, styles[size])}>{children}</Tag>;
};
