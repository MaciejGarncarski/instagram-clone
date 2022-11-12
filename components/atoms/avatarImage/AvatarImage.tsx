import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
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

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  if (isError || !data?.avatar_url) {
    return <BiUser className={styles.placeholder} />;
  }

  const { avatar_url, username } = data;

  return (
    <>
      {(!isImgLoaded || isLoading) && <Loader variant={['margins', 'small']} />}
      <Image
        fill
        sizes={sizes ? sizes : '100'}
        className={clsx(styles.image, isImgLoaded && styles.visible)}
        src={avatar_url}
        alt={`${username}'s profile picture`}
        onLoad={() => setIsImgLoaded(true)}
        priority
      />
    </>
  );
};
