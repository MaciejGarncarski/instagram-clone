/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChangeEvent, forwardRef, useRef, useState } from 'react';

import { useImageInput } from '@/hooks/posts/useImageInput';

import styles from './userAvatar.module.scss';

import { AvatarImage } from '@/components/atoms/avatarImage/AvatarImage';
import { EditIcon } from '@/components/atoms/icons/EditIcon';
import { UserAvatarModal } from '@/components/molecules/modals/userAvatarModal/UserAvatarModal';

export type AvatarVariant = {
  variant?: 'big-border';
};

type UserAvatarProps = {
  className?: string;
  editable?: boolean;
  userID: string;
} & AvatarVariant;

export const UserAvatar = forwardRef<HTMLInputElement, UserAvatarProps>(
  ({ className, editable, userID, variant }, ref) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>('');
    const imgRef = useRef<HTMLImageElement>(null);

    const { handleImg } = useImageInput({ aspect: 1, setImgSrc });

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files || !ev.target.files[0]) {
        return;
      }
      setIsEditing(true);
      handleImg(ev);
    };

    if (editable) {
      return (
        <div className={clsx(className, variant && styles[variant], styles.container)}>
          <input
            ref={ref}
            id='set-avatar'
            type='file'
            accept='.jpg, .jpeg, .png'
            className={styles.input}
            name='set-avatar'
            onChange={onChange}
          />
          <label className={styles.label} htmlFor='set-avatar'>
            <span className={styles.overlay} title='change avatar'>
              <EditIcon size={50} className={styles.icon} />
            </span>
            <AvatarImage userID={userID} />
          </label>
          {isEditing && (
            <UserAvatarModal
              imgRef={imgRef}
              setIsEditing={setIsEditing}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
            />
          )}
        </div>
      );
    }

    return (
      <div className={clsx(className, variant && styles[variant], styles.container)}>
        <AvatarImage userID={userID} />
      </div>
    );
  }
);
