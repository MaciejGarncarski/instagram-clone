import { useRef } from 'react';

import { useProfile } from '@/hooks/useProfile';

import styles from './avatarContainer.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';

export const AvatarContainer = () => {
  const avatarRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useProfile();

  const onClick = () => {
    if (!avatarRef.current) {
      return null;
    }
    avatarRef.current.click();
  };
  return (
    <div className={styles['avatar-container']}>
      <UserAvatar className={styles.avatar} ref={avatarRef} />
      <div className={styles['avatar-change']}>
        {userData?.username && <h2>{userData.username}</h2>}
        <button type='button' className={styles['avatar-button']} onClick={onClick}>
          Change profile photo
        </button>
      </div>
    </div>
  );
};
