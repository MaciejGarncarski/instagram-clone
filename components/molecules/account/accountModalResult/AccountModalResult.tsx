import { useAtom } from 'jotai';
import Link from 'next/link';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountModalResult.module.scss';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { Loader } from '@/components/atoms/loader/Loader';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';
import { accountModal } from '@/components/pages/account/Account';

type AccountModalProps = {
  userID: string;
};

export const AccountModalResult = ({ userID }: AccountModalProps) => {
  const { data } = useProfile(userID);
  const [, setAccountModal] = useAtom(accountModal);

  if (!data) {
    return (
      <div className={styles.loader}>
        <Loader variant={['margins', 'small']} />
      </div>
    );
  }

  return (
    <li className={styles.result}>
      <Link
        onClick={() => setAccountModal(null)}
        className={styles.link}
        href={`/${data.username}`}
      >
        <UserAvatar userID={userID} className={styles.avatar} />
        {data.username}
      </Link>
      <FollowButton className={styles.follow} userID={userID} />
    </li>
  );
};
