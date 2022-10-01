import Image from 'next/future/image';
import { BiUser } from 'react-icons/bi';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './userAvatar.module.scss';

import { Loader } from '@/components/loader/Loader';

export const AvatarImage = () => {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.avatar_url) {
    return <BiUser />;
  }

  return (
    <Image
      fill
      sizes='130'
      className={styles.image}
      src={data?.avatar_url}
      alt='user profile picture'
      priority
    />
  );
};
