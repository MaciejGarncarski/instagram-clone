import clsx from 'clsx';
import { forwardRef } from 'react';
import { BiEdit } from 'react-icons/bi';

import { useAvatarInput } from '@/hooks/useAvatarInput';

import styles from './userAvatar.module.scss';

import { AvatarImage } from '@/components/atoms/avatarImage/AvatarImage';

type UserAvatarProps = {
  className?: string;
  editable?: boolean;
  userID: string;
  sizes?: string;
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(
  ({ className, editable, userID, sizes }, ref) => {
    const { handleChange } = useAvatarInput();

    if (editable) {
      return (
        <div className={clsx(className, styles.container)}>
          <input
            ref={ref}
            id='set-avatar'
            type='file'
            accept='.jpg, .jpeg, .png'
            className={styles.input}
            name='set-avatar'
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor='set-avatar'>
            <span className={styles.overlay} title='change avatar'>
              <BiEdit size={50} />
            </span>
            <AvatarImage sizes={sizes} userID={userID} />
          </label>
        </div>
      );
    }

    return (
      <div className={clsx(className, styles.container)}>
        <AvatarImage sizes={sizes} userID={userID} />
      </div>
    );
  }
);
