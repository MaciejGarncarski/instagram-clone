import Image from 'next/future/image';

import { useProfile } from '@/hooks/useProfile';

import styles from './userAvatar.module.scss';

import { Loader } from '@/components/loader/Loader';

import defaultIMG from '~/images/account.svg';

export const AvatarImage = () => {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Image
        className={styles.image}
        src={defaultIMG}
        fill
        sizes='130'
        alt='user profile picture'
        priority
      />
    );
  }

  if (!data?.avatar_url) {
    return (
      <Image
        className={styles.image}
        src={defaultIMG}
        fill
        sizes='130'
        alt='user profile picture'
        priority
      />
    );
  }

  return (
    <Image
      fill
      sizes='130'
      className={styles.image}
      src={data?.avatar_url ?? defaultIMG}
      alt='user profile picture'
      priority
    />
  );
};
