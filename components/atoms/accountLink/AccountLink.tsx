import clsx from 'clsx';
import Image from 'next/future/image';
import Link from 'next/link';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountLink.module.scss';

export const AccountLink = () => {
  const { data } = useProfile();

  if (data?.avatar_url) {
    return (
      <li className={styles.item}>
        <Link href='/profile/me' passHref>
          <a className={styles.link}>
            <Image
              className={clsx(styles.img, styles.border)}
              src={data?.avatar_url}
              width={70}
              height={70}
              alt={`${data.username} account`}
            />
            <span className='sr-only'>{data.username} account</span>
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <Link href='/profile/me' passHref>
        <a className={styles.login}>Log in</a>
      </Link>
    </li>
  );
};
