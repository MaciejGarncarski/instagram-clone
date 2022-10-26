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
              <Link href={to} className={styles.link}>
                <span className={styles.icon}>{icon}</span>
                <span className='visually-hidden'>{name}</span>
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
      <Link href='/auth/register' className={styles.button}>
        Sign up
      </Link>
      <Link href='/auth/login' className={styles.text}>
        Log in
      </Link>
    </div>
  );
};
