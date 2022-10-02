import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './account.module.scss';

import { Posts } from '@/components/account/posts/Posts';
import { Text } from '@/components/account/text/Text';
import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';
import { Loader } from '@/components/loader/Loader';

type AccountProps = {
  userID: string;
};

export const Account = ({ userID }: AccountProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { data, isLoading, isError } = useProfile(userID);

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

  const handleLogout = async () => {
    supabaseClient.auth.signOut();
    router.push('/');
    queryClient.setQueryData(['profile', user?.id], null);
  };

  if (!data) {
    return null;
  }

  const { bio, username, _count, website } = data;

  return (
    <>
      <NextSeo title='Profile' />
      <section id='main' className={styles.account}>
        <UserAvatar userID={userID} />
        <div className={styles['user-info']}>
          <h2 className={styles.username}>{username ?? 'no username'}</h2>
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
        <div className={styles.buttons}>
          <Link href='/profile/edit' passHref>
            <motion.a
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.06 }}
              className={styles.button}
            >
              Edit Profile
            </motion.a>
          </Link>
          <Button
            type='button'
            className={clsx(styles.button, styles['button--error'])}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </section>
      <Posts userID={userID} />
    </>
  );
};
