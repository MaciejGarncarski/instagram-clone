import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Header } from '@/components/layout/header/Header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};
