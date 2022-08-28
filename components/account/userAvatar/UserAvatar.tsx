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
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(({ className }, ref) => {
  const [error] = useAtom(changeAvatarError);
  const handleChange = useAvatarInput();

  return (
    <div className={styles.container}>
      <input
        ref={ref}
        id='set-avatar'
        type='file'
        accept='.jpg, .jpeg, .png'
        className={styles.input}
        name='set-avatar'
        onChange={handleChange}
      />
      <label className={clsx(styles.label, className)} htmlFor='set-avatar'>
        <div className={styles.overlay} title='change avatar'>
          <Image src={edit} alt='edit avatar' />
        </div>
        <AvatarImage />
      </label>
      <p className={styles.error}>{error}</p>
    </div>
  );
});
