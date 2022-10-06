import Image from 'next/future/image';
import { BiUser } from 'react-icons/bi';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './avatarImage.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

type AvatarImageProps = {
  userID: string;
};

export const AvatarImage = ({ userID }: AvatarImageProps) => {
  const { data, isLoading, isError } = useProfile(userID);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.avatar_url) {
    return <BiUser className={styles.placeholder} />;
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
