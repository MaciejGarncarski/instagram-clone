import Link from 'next/link';

import styles from './header.module.scss';

import { Nav } from './nav/Nav';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/' shallow>
        <a className={styles.link}>Gram-Gram</a>
      </Link>
      <Nav />
    </header>
  );
};
