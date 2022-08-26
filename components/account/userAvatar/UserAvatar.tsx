import clsx from 'clsx';
import Image from 'next/future/image';
import { useState } from 'react';

import styles from './userAvatar.module.scss';

import { useHandleChange } from '@/hooks/useHandleChange';

import edit from '@/images/edit.svg';

import { AvatarImage } from './AvatarImage';

type UserAvatarProps = {
  className?: string;
};

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const [error, setError] = useState('');

  const handleChange = useHandleChange(setError);

  return (
    <div className={clsx(className, styles.container)}>
      <input
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
      <p className={styles.error}>{error}</p>
    </div>
  );
};
