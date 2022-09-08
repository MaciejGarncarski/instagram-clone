import clsx from 'clsx';
import Image from 'next/future/image';
import { forwardRef } from 'react';

import { useAvatarInput } from '@/hooks/useAvatarInput';

import styles from './userAvatar.module.scss';

import { Popup } from '@/components/popup/Popup';

import { AvatarImage } from './AvatarImage';

import edit from '~/images/edit.svg';

type UserAvatarProps = {
  className?: string;
  editable?: boolean;
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(
  ({ className, editable }, ref) => {
    const { handleChange, isUpdated, error } = useAvatarInput();

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
            <div className={styles.overlay} title='change avatar'>
              <Image src={edit} alt='edit avatar' />
            </div>
            <AvatarImage />
          </label>
          {isUpdated && <Popup timeout={6}>Updated profile picture 😎</Popup>}
          {error && (
            <Popup isError timeout={6}>
              {error}
            </Popup>
          )}
        </div>
      );
    }

    return (
      <div className={clsx(className, styles.container)}>
        <AvatarImage />
      </div>
    );
  }
);
