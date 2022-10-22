import Link from 'next/link';
import { ReactNode } from 'react';
import { BiBookmark } from 'react-icons/bi';
import { CgAddR } from 'react-icons/cg';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './nav.module.scss';

import { AccountLink } from '@/components/atoms/accountLink/AccountLink';

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
  const { data } = useProfile();

  if (data?.username) {
    return (
      <ul className={styles.menu}>
        {routes.map(({ name, icon, to }) => {
          return (
            <li key={name} className={styles.item}>
              <Link href={to} passHref>
                <a className={styles.link}>
                  <span className={styles.icon}>{icon}</span>
                  <span className='visually-hidden'>{name}</span>
                </a>
              </Link>
            </li>
          );
        })}
        <AccountLink />
      </ul>
    );
  }

  return (
    <div className={styles.guest}>
      <Link href='/auth/register' passHref>
        <a className={styles.button}>Sign up</a>
      </Link>
      <Link href='/auth/login' passHref>
        <a className={styles.text}>Log in</a>
      </Link>
    </div>
  );
};
