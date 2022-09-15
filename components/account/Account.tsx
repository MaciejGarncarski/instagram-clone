import { motion } from 'framer-motion';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { useProfile } from '@/hooks/useProfile';

import styles from './account.module.scss';

import { Text } from '@/components/account/text/Text';
import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Loader } from '@/components/loader/Loader';

export const Account = () => {
  const { data, error, isLoading } = useProfile();

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

  if (isLoading || !data) {
    return (
      <>
        <NextSeo title='Loading profile' />
        <main className={styles.loader}>
          <Loader />
        </main>
      </>
    );
  }

  return (
    <div className={styles.profile}>
      <NextSeo title='Profile' />
      <main className={styles.account}>
        <UserAvatar className={styles.avatar} />

        <div className={styles['user-info']}>
          <div className={styles['username-container']}>
            <h2 className={styles.username}>{data?.username ?? 'no username'}</h2>

            <Link href='/account/edit' passHref>
              <motion.a
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.06 }}
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
    </div>
  );
};
