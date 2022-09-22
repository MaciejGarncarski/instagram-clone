import clsx from 'clsx';
import Image from 'next/future/image';
import { forwardRef } from 'react';

import { useAvatarInput } from '@/hooks/useAvatarInput';

import styles from './userAvatar.module.scss';

import { AvatarImage } from './AvatarImage';

import edit from '~/images/edit.svg';

type UserAvatarProps = {
  className?: string;
  editable?: boolean;
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(
  ({ className, editable }, ref) => {
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
            <div className={styles.overlay} title='change avatar'>
              <Image fill sizes='130' src={edit} alt='edit avatar' />
            </div>
            <AvatarImage />
          </label>
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
