import Image from 'next/image';
import { BiUser } from 'react-icons/bi';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './avatarImage.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

type AvatarImageProps = {
  userID: string;
  sizes?: string;
};

export const AvatarImage = ({ userID, sizes }: AvatarImageProps) => {
  const { data, isLoading, isError } = useProfile(userID);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.avatar_url) {
    return <BiUser className={styles.placeholder} />;
  }

  const { avatar_url, username } = data;

  return (
    <Image
      fill
      sizes={sizes ? sizes : '100'}
      className={styles.image}
      src={avatar_url}
      alt={`${username}'s profile picture`}
      priority
    />
  );
};
