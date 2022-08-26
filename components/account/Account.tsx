import { motion } from 'framer-motion';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import styles from './account.module.scss';

import { useProfile } from '@/hooks/useProfile';

import { UserAvatar } from './userAvatar/UserAvatar';
import { Heading } from '../heading/Heading';

export const Account = () => {
  const { data, error } = useProfile();
  if (error) {
    return (
      <>
        <NextSeo title='Profile' />
        <main>
          <Heading size='h2'>Error</Heading>
        </main>
      </>
    );
  }

  if (data) {
    return (
      <>
        <NextSeo title='Profile' />
        <main className={styles.container}>
          <UserAvatar />

          <div className={styles['user-info']}>
            <div className={styles['user-heading']}>
              <h2 className={styles['user-name']}>{data.username}</h2>
              <p className={styles.email}>{data.email}</p>
            </div>
            <Link href='/account/edit' passHref>
              <motion.a
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.04 }}
                className={styles.edit}
              >
                Edit Profile
              </motion.a>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NextSeo title='Loading profile' />
      <main>loading</main>
    </>
  );
};
