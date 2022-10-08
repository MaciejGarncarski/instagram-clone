import { useUser } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { namedComponent } from '@/lib/namedComponent';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './account.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccountPostContainer } from '@/components/molecules/accountPostContainer/AccountPostContainer';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type AccountProps = {
  userID: string;
};

const AccountSettings = dynamic(() =>
  namedComponent(
    import('@/components/organisms/accountSettings/AccountSettings'),
    'AccountSettings'
  )
);

export const Account = ({ userID }: AccountProps) => {
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

  if (!data) {
    return null;
  }

  const { bio, username, _count, website, profile_id } = data;

  return (
    <>
      <NextSeo title={username ?? 'Delaygram'} />
      <section id='main' className={styles.account}>
        <UserAvatar userID={userID} className={styles.avatar} />
        <div className={styles['user-info']}>
          <h2 className={styles.username}>{username ?? `user-${profile_id}`}</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles['stat-number']}>{_count.posts}</span>
              <p>
                {_count.posts > 1 && 'posts'}
                {_count.posts === 1 && 'post'}
                {_count.posts === 0 && 'posts'}
              </p>
            </div>
          </div>
          {bio && <p className={styles.text}>{bio}</p>}
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          )}
        </div>
        {userID === user.id && <AccountSettings />}
      </section>
      <AccountPostContainer userID={userID} />
    </>
  );
};
