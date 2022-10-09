import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { namedComponent } from '@/lib/namedComponent';
import { Profile } from '@/hooks/profile/useProfile';

import styles from './account.module.scss';

import { AccountPostContainer } from '@/components/molecules/accountPostContainer/AccountPostContainer';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type AccountProps = {
  userData: Profile;
};

const AccountSettings = dynamic(() =>
  namedComponent(
    import('@/components/organisms/accountSettings/AccountSettings'),
    'AccountSettings'
  )
);

export const Account = ({ userData }: AccountProps) => {
  const { user } = useUser();

  if (!userData) {
    return null;
  }

  const { bio, username, _count, website, profile_id, id } = userData;

  const isAccountMine = id === user?.id;

  return (
    <>
      <NextSeo title={username ?? 'Delaygram'} />
      <section id='main' className={styles.account}>
        <UserAvatar
          userID={id}
          className={clsx(!isAccountMine && styles['avatar--columns'], styles.avatar)}
        />
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
        {isAccountMine && <AccountSettings />}
      </section>
      <AccountPostContainer userID={id} />
    </>
  );
};
