import Link from 'next/link';
import { ReactNode } from 'react';
import { BiBookmark } from 'react-icons/bi';
import { CgAddR } from 'react-icons/cg';

import styles from './nav.module.scss';

import { AccountLink } from '../../../atoms/accountLink/AccountLink';

type Routes = {
  to: string;
  name: string;
  icon: ReactNode;
};

const routes: Array<Routes> = [
  { to: '/favorite', name: 'favorite', icon: <BiBookmark /> },
  { to: '/new-post', name: 'add post', icon: <CgAddR /> },
];

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {routes.map(({ name, icon, to }) => {
          return (
            <li key={name} className={styles.item}>
              <Link href={to} passHref>
                <a className={styles.link}>
                  <span className={styles.icon}>{icon}</span>
                  <span className='sr-only'>{name}</span>
                </a>
              </Link>
            </li>
          );
        })}
        <AccountLink />
      </ul>
    </nav>
  );
};
