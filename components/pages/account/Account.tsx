import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { namedComponent } from '@/lib/namedComponent';
import { useProfileByUsername } from '@/hooks/useProfileByUsername';

import styles from './account.module.scss';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { Loader } from '@/components/atoms/loader/Loader';
import {
  AccountModal,
  AccountModalVariant,
} from '@/components/molecules/accountModal/AccountModal';
import { AccountPostContainer } from '@/components/molecules/accountPostContainer/AccountPostContainer';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

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

export const Account = () => {
  const [accountModalOpen, setAccountModal] = useAtom(accountModal);
  const user = useUser();
  const router = useRouter();

  const usernameFromQuery = typeof router.query.username === 'string' ? router.query.username : '';
  const { data, isLoading } = useProfileByUsername(usernameFromQuery);

  if (!data || isLoading) {
    return <Loader />;
  }

  const { bio, username, full_name, _count, website, profile_id, id } = data;
  const isOwner = id === user?.id;

  const statsData: Array<StatsData> = [
    {
      number: _count.posts,
      text: 'posts',
      onClick: () =>
        window.scrollBy({
          top: 350,
          behavior: 'smooth',
        }),
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
            className={clsx(!isOwner && styles['avatar--columns'], styles.avatar)}
          />
          <div className={styles['user-info']}>
            <h2 className={styles.username}>@{username}</h2>
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
            <div className={styles.bio}>
              <p className={styles.fullname}>{full_name ?? `user-${profile_id}`}</p>
              {bio && <p className={styles.bioText}>{bio}</p>}
              {website && (
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {website}
                </a>
              )}
            </div>
          </div>
          {accountModalOpen === 'followers' && (
            <AccountModal username={username ?? ''} variant='followers' />
          )}
          {accountModalOpen === 'following' && (
            <AccountModal username={username ?? ''} variant='following' />
          )}
          <FollowButton userID={id} className={styles.followBtn} />
          {isOwner && <AccountSettings />}
        </section>
        <AccountPostContainer userID={id} />
      </main>
    </>
  );
};
