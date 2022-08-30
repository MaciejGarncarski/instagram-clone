import Image from 'next/future/image';

import { useUser } from '@/hooks/useUser';

import styles from './userAvatar.module.scss';

import { Loader } from '@/components/loader/Loader';

import defaultIMG from '@/images/account.svg';

export const AvatarImage = () => {
  const { data: profileData, isFetching, isError } = useUser();

  const sizes = {
    width: 130,
    height: 130,
  };

  if (isFetching) {
    return <Loader variant='white' />;
  }

  if (isError) {
    return (
      <Image
        className={styles.image}
        src={defaultIMG}
        {...sizes}
        alt='user profile picture'
        placeholder='blur'
        blurDataURL={defaultIMG}
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
