import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { namedComponent } from '@/lib/namedComponent';
import { Profile } from '@/hooks/profile/useProfile';

import styles from './account.module.scss';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import {
  AccountModal,
  AccountModalVariant,
} from '@/components/molecules/accountModal/AccountModal';
import { AccountPostContainer } from '@/components/molecules/accountPostContainer/AccountPostContainer';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type AccountProps = {
  userData: Profile;
};

type StatsData = {
  number: number;
  text: string;
  onClick?: () => void;
};

const AccountSettings = dynamic(() =>
  namedComponent(
    import('@/components/organisms/accountSettings/AccountSettings'),
    'AccountSettings'
  )
);

export const accountModal = atom<AccountModalVariant | null>(null);

export const Account = ({ userData }: AccountProps) => {
  const [accountModalOpen, setAccountModal] = useAtom(accountModal);
  const user = useUser();

  if (!userData) {
    return null;
  }

  const { bio, username, full_name, _count, website, profile_id, id } = userData;
  const isAccountMine = id === user?.id;

  const statsData: Array<StatsData> = [
    {
      number: _count.posts,
      text: 'posts',
    },
    {
      number: _count.fromUser,
      text: 'following',
      onClick: () => setAccountModal('following'),
    },
    {
      number: _count.toUser,
      text: 'followers',
      onClick: () => setAccountModal('followers'),
    },
  ];

  return (
    <>
      <NextSeo title={`${full_name} (@${username})`} />
      <main id='main'>
        <section aria-labelledby='user account' className={styles.account}>
          <UserAvatar
            userID={id}
            className={clsx(!isAccountMine && styles['avatar--columns'], styles.avatar)}
          />
          <div className={styles['user-info']}>
            <div className={styles.name}>
              <h2 className={styles.username}>{full_name ?? `user-${profile_id}`}</h2>
              <p>@{username}</p>
            </div>
            <div className={styles.stats}>
              {statsData.map(({ number, text, onClick }) => {
                return (
                  <button className={styles.stat} key={text} onClick={onClick} type='button'>
                    <span className={styles['stat-number']}>{number}</span>
                    {text}
                  </button>
                );
              })}
            </div>
            {bio && <p className={styles.text}>{bio}</p>}
            {website && (
              <a href={website} target='_blank' rel='noopener noreferrer'>
                {website}
              </a>
            )}
          </div>
          {accountModalOpen === 'followers' && (
            <AccountModal username={username ?? ''} variant='followers' />
          )}
          {accountModalOpen === 'following' && (
            <AccountModal username={username ?? ''} variant='following' />
          )}
          <FollowButton userID={id} className={styles.followBtn} />
          {isAccountMine && <AccountSettings />}
        </section>
        <AccountPostContainer userID={userData.id} />
      </main>
    </>
  );
};
