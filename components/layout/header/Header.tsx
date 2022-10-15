import Link from 'next/link';

import styles from './header.module.scss';

import { Nav } from '../nav/Nav';

export const Header = () => {
  return (
    <nav>
      <a href='#main' className={styles.skip}>
        Skip to main content
      </a>

      <Link href='/'>
        <a className={styles.link}>
          <h1 className={styles.heading}>Delaygram</h1>
        </a>
      </Link>
      <Nav />
    </nav>
  );
};
