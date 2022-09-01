import Image from 'next/future/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

import styles from './nav.module.scss';

import add from '@/images/add.svg';
import bookmark from '@/images/bookmark.svg';

import { AccountLink } from './AccountLink';

type Routes = {
  to: string;
  name: string;
  icon: StaticImageData;
};

const routes: Array<Routes> = [
  { to: '/favorite', name: 'favorite', icon: bookmark },
  { to: '/new-post', name: 'add post', icon: add },
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
                  <Image className={styles.img} src={icon} alt={name} />
                  <span className='visually-hidden'>{name}</span>
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
