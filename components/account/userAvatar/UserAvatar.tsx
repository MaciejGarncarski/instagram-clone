import clsx from 'clsx';
import Image from 'next/future/image';
import { forwardRef, useState } from 'react';

import { useAvatarInput } from '@/hooks/useAvatarInput';

import styles from './userAvatar.module.scss';

import edit from '@/images/edit.svg';

import { AvatarImage } from './AvatarImage';

type UserAvatarProps = {
  className?: string;
};

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(({ className }, ref) => {
  const [error, setError] = useState('');

  const handleChange = useAvatarInput(setError);

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
      <p>{error}</p>
    </div>
  );
});
