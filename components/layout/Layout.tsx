import Link from 'next/link';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import styles from './layout.module.scss';

import { Nav } from '@/components/layout/nav/Nav';
import { Search } from '@/components/layout/search/Search';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <a href='#main' className={styles.skip}>
        Skip to main content
      </a>

      <nav className={styles.nav}>
        <h1 className={styles.heading}>
          <Link href='/' className={styles.link}>
            Delaygram
          </Link>
        </h1>
        <Search />
        <Nav />
      </nav>
      <ToastContainer theme='light' autoClose={2200} position='bottom-right' />
      {children}
    </div>
  );
};
