import Image from 'next/future/image';

import { useProfile } from '@/hooks/useProfile';

import styles from './userAvatar.module.scss';

import { Loader } from '@/components/loader/Loader';

import defaultIMG from '@/images/account.svg';

export const AvatarImage = () => {
  const { data: profileData, isLoading, isError } = useProfile();

  const sizes = {
    width: 130,
    height: 130,
  };

  if (isLoading) {
    return <Loader variant='white' />;
  }

  if (isError) {
    return (
      <Image
        className={styles.image}
        src={defaultIMG}
        {...sizes}
        alt='user profile picture'
        priority
      />
    );
  }

  if (!profileData?.avatar_url) {
    return (
      <Image
        className={styles.image}
        src={defaultIMG}
        {...sizes}
        alt='user profile picture'
        priority
      />
    );
  }

  return (
    <Image
      className={styles.image}
      src={profileData?.avatar_url ?? defaultIMG}
      {...sizes}
      alt='user profile picture'
      priority
    />
  );
};
