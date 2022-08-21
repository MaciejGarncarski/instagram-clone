import { StaticImageData } from 'next/image';

import styles from './nav.module.scss';

import profile from '@/images/account.svg';
import add from '@/images/add.svg';
import bookmark from '@/images/bookmark.svg';

import { Item } from './item/Item';

type Routes = {
  to: string;
  name: string;
  icon: StaticImageData;
};

const routes: Array<Routes> = [
  { to: '/favorite', name: 'favorite', icon: bookmark },
  { to: '/new-post', name: 'add post', icon: add },
  { to: '/profile', name: 'profile', icon: profile },
];

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {routes.map(({ name, icon, to }) => {
          return <Item key={name} text={name} to={to} icon={icon} />;
        })}
      </ul>
    </nav>
  );
};
