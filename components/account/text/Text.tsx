import { ReactNode } from 'react';

import styles from './text.module.scss';

type TextProps = {
  children: ReactNode;
};

export const Text = ({ children }: TextProps) => {
  return <p className={styles.text}>{children}</p>;
};
