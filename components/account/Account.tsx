import { motion } from 'framer-motion';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { useProfile } from '@/hooks/useProfile';

import styles from './account.module.scss';

import { UserAvatar } from './userAvatar/UserAvatar';
import { Heading } from '../heading/Heading';
import { Loader } from '../loader/Loader';

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
            <div className={styles.info}>
              <Heading size='h2'>{data.username ?? data.email}</Heading>
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
            {data.website && <p>🌍 {data.website}</p>}
            {data.bio && <p>💭 {data.bio}</p>}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NextSeo title='Loading profile' />
      <main>
        <Loader />
      </main>
    </>
  );
};
