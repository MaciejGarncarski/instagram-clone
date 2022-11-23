import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { BiBookmark } from 'react-icons/bi';
import { CgAddR } from 'react-icons/cg';

import { namedComponent } from '@/lib/namedComponent';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './nav.module.scss';

import { AccountLink } from '@/components/atoms/accountLink/AccountLink';
import { HomeIcon } from '@/components/atoms/icons/HomeIcon';

import { imgSrcAtom } from '@/store/store';

const CreatePostModal = dynamic(() =>
  namedComponent(
    import('@/components/organisms/createPostModal/CreatePostModal'),
    'CreatePostModal'
  )
);

type Routes = {
  to: string;
  name: string;
  icon: ReactNode;
};

const routes: Array<Routes> = [
  { to: '/', name: 'home', icon: <HomeIcon /> },
  { to: '/favorite', name: 'favorite', icon: <BiBookmark /> },
];

export const createPostModalAtom = atom<boolean>(false);

export const Nav = () => {
  const { data } = useProfile();
  const router = useRouter();
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [isAddPostOpen, setIsAddPostOpen] = useAtom(createPostModalAtom);

  const openCreatePostModal = () => {
    if (data) {
      setIsAddPostOpen(true);
      setImgSrc('');
    }
  };

  if (data?.username) {
    return (
      <ul className={styles.menu}>
        {routes.map(({ name, icon, to }) => {
          return (
            <li key={name} className={styles.item}>
              <Link href={to} className={styles.link}>
                <span className={clsx(styles.icon, router.pathname === to && styles.active)}>
                  {icon}
                </span>
                <span className='visually-hidden'>{name}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type='button'
            className={clsx(styles.item, styles.icon, styles.link)}
            onClick={openCreatePostModal}
          >
            <CgAddR />
            <span className='visually-hidden'>add new post</span>
          </button>
        </li>
        <AccountLink />
        <AnimatePresence>{isAddPostOpen && <CreatePostModal />}</AnimatePresence>
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
