import Image, { StaticImageData } from 'next/future/image';
import { ChangeEventHandler } from 'react';

import styles from './userAvatar.module.scss';

type UserAvatarProps = {
  handleAvatar: ChangeEventHandler<HTMLInputElement>;
  src: StaticImageData | string;
  width: number;
  height: number;
  alt: string;
};

export const UserAvatar = ({ handleAvatar, src, width, height, alt }: UserAvatarProps) => {
  return (
    <div className={styles.container}>
      <input
        id='set-avatar'
        type='file'
        onChange={handleAvatar}
        accept='.jpg, .jpeg, .webp, .png'
        className={styles.input}
      />
      <label className={styles.label} htmlFor='set-avatar'>
        <div className={styles.overlay}>+</div>
        <Image
          className={styles.image}
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority
        />
      </label>
    </div>
  );
};
