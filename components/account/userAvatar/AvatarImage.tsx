import { motion } from 'framer-motion';
import Image from 'next/future/image';
import { useEffect, useState } from 'react';

import styles from './userAvatar.module.scss';

import { useProfile } from '@/hooks/useProfile';

import defaultIMG from '@/images/account.svg';
import sync from '@/images/sync.svg';

const Loader = () => {
  return (
    <motion.div
      className={styles.loading}
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <Image src={sync} alt='updating' />
    </motion.div>
  );
};

export const AvatarImage = () => {
  const { data: profileData, isFetching, isError } = useProfile();
  const [src, setSrc] = useState<string>(defaultIMG);

  useEffect(() => {
    if (profileData && profileData.avatar_url) {
      setSrc(profileData.avatar_url);
    }
  }, [profileData]);

  const sizes = {
    width: 200,
    height: 200,
  };

  if (isFetching) {
    return <Loader />;
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

  return (
    <Image
      className={styles.image}
      onError={() => setSrc(defaultIMG)}
      src={src ? src : defaultIMG}
      {...sizes}
      alt='user profile picture'
      priority
    />
  );
};
