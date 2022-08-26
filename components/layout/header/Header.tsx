import Link from 'next/link';

import styles from './header.module.scss';

import { Nav } from './nav/Nav';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.link}>
          <h1 className={styles.heading}>Gram-Gram</h1>
        </a>
      </Link>
      <Nav />
    </header>
  );
};
