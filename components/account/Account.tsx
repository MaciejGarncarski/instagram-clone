import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './account.module.scss';

import { Posts } from '@/components/account/posts/Posts';
import { Text } from '@/components/account/text/Text';
import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Loader } from '@/components/loader/Loader';

export const Account = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, user } = useProfile();

  if (isError) {
    return <h2>Error</h2>;
  }

  if (isLoading || !user?.id) {
    return (
      <main className={styles.loader}>
        <Loader />
      </main>
    );
  }

  if (!data) {
    return null;
  }

  const { bio, username, _count, website } = data;

  const handleLogout = async () => {
    supabaseClient.auth.signOut();
    router.push('/');
    queryClient.setQueryData(['profile'], null);
  };

  return (
    <>
      <NextSeo title='Profile' />
      <main id='main' className={styles.account}>
        <UserAvatar className={styles.avatar} />
        <div className={styles['user-info']}>
          <div className={styles['username-container']}>
            <h2 className={styles.username}>{username ?? 'no username'}</h2>
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
            <div className={styles.stat}>
              <span className={styles['stat-number']}>{_count.posts}</span>
              <p>{_count.posts > 1 ? 'posts' : 'post'}</p>
            </div>
          </div>
          {bio && <Text>{bio}</Text>}
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          )}
        </div>
      </main>
      <button onClick={handleLogout}>Log out</button>
      <Posts />
    </>
  );
};
