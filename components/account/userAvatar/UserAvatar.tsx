import clsx from 'clsx';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import { forwardRef } from 'react';

import { useAvatarInput } from '@/hooks/useAvatarInput';

import styles from './userAvatar.module.scss';

import { changeAvatarError } from '@/store/store';

import edit from '@/images/edit.svg';

import { AvatarImage } from './AvatarImage';

type UserAvatarProps = {
  className?: string;
  editable?: boolean;
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(
  ({ className, editable }, ref) => {
    const [error, setError] = useAtom(changeAvatarError);
    const { handleChange, isUpdating } = useAvatarInput();

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
