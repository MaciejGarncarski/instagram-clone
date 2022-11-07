import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountLink.module.scss';

export const AccountLink = () => {
  const { data } = useProfile();

  const url = `/${data?.username}`;

  if (data?.avatar_url) {
    return (
      <li className={styles.item}>
        <Link href={url} className={styles.link}>
          <Image
            className={clsx(styles.img, styles.border)}
            src={data?.avatar_url}
            width={70}
            height={70}
            alt={`${data.username} account`}
          />
          <span className='visually-hidden'>{data.username} account</span>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <Link href={url} className={styles.link}>
        <BiUser />
        <span className='visually-hidden'>user account</span>
      </Link>
    </li>
  );
};
