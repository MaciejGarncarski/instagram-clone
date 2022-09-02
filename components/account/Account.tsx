import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import { useProfile } from '@/hooks/useProfile';

import styles from './account.module.scss';

import { Text } from './text/Text';
import { UserAvatar } from './userAvatar/UserAvatar';
import { Loader } from '../loader/Loader';

export const Account = () => {
  const { data, error, isLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (data?.username === null) {
      router.push('/account/edit');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.username]);

  if (error) {
    return (
      <>
        <NextSeo title='Profile' />
        <main>
          <h2>Error</h2>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <NextSeo title='Loading profile' />
        <main>
          <Loader />
        </main>
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <NextSeo title='Profile' />
      <main className={styles.account}>
        <UserAvatar className={styles.avatar} />

        <div className={styles['user-info']}>
          <div className={styles['username-container']}>
            <h2 className={styles.username}>{data?.username ?? 'no username'}</h2>

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
          <div className={styles.stats}>
            <dl className={styles['stats-list']}>
              <div className={styles['stat-container']}>
                <dd className={styles['stat-count']}>0</dd>
                <dt>posts</dt>
              </div>
              <div className={styles['stat-container']}>
                <dd className={styles['stat-count']}>0</dd>
                <dt>followers</dt>
              </div>
              <div className={styles['stat-container']}>
                <dd className={styles['stat-count']}>0</dd>
                <dt>following</dt>
              </div>
            </dl>
          </div>
          {data.bio && <Text>{data.bio}</Text>}
          {data.website && (
            <a href={data.website} target='_blank' rel='noopener noreferrer'>
              {data.website}
            </a>
          )}
        </div>
      </main>
    </>
  );
};
