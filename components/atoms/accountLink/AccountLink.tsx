import Image from 'next/image';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountLink.module.scss';

export const AccountLink = () => {
  const { data } = useProfile();

  const url = `/${data?.username}`;

  return (
    <li className={styles.item}>
      <Link href={url} className={styles.link}>
        {data?.avatar_url && (
          <Image
            className={styles.avatar}
            width={30}
            height={30}
            priority
            src={data.avatar_url}
            alt={`${data.username}`}
          />
        )}
        {!data?.avatar_url && <BiUser className={styles.avatar} />}
        <span className='visually-hidden'>user account</span>
      </Link>
    </li>
  );
};
