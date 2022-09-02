import clsx from 'clsx';
import Image from 'next/future/image';
import Link from 'next/link';

import { useProfile } from '@/hooks/useProfile';

import styles from './nav.module.scss';

import defaultImg from '@/images/account.svg';

export const AccountLink = () => {
  const { data } = useProfile();

  if (data?.avatar_url) {
    return (
      <li className={styles.item}>
        <Link href='/account' passHref>
          <a className={styles.link}>
            <Image
              className={clsx(styles.img, styles.border)}
              src={data?.avatar_url}
              width={70}
              height={70}
              alt={`${data.username} account`}
            />
            <span className='visually-hidden'>{data.username} account</span>
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <Link href='/account' passHref>
        <a className={styles.link}>
          <Image
            className={styles.img}
            src={defaultImg}
            width={70}
            height={70}
            alt='user account'
          />
          <span className='visually-hidden'>user account</span>
        </a>
      </Link>
    </li>
  );
};
