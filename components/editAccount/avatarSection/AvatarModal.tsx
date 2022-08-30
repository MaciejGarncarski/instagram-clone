import { useState } from 'react';

import { supabase } from '@/lib/supabase';
import { useDeleteAvatar } from '@/hooks/useDeleteAvatar';
import { useUser } from '@/hooks/useUser';

import styles from './avatarSection.module.scss';

import { Loader } from '@/components/loader/Loader';
import { Modal } from '@/components/modal/Modal';

type AvatarModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const AvatarModal = ({ modalOpen, setModalOpen }: AvatarModalProps) => {
  const { data } = useUser();
  const { mutate } = useDeleteAvatar();
  const [removingAvatar, setRemovingAvatar] = useState<boolean>(false);

  const handleRemovePhoto = async () => {
    if (typeof data?.avatar_url !== 'string') {
      return;
    }

    const { error } = await supabase.storage.from('avatars').remove([data?.avatar_url]);

    if (error) {
      return;
    }

    setRemovingAvatar(true);

    mutate(undefined, {
      onSettled: () => {
        setRemovingAvatar(false);
        setModalOpen(false);
      },
    });
  };

  return (
    <Modal
      acceptText='remove photo'
      cancelText='cancel'
      onAccept={handleRemovePhoto}
      onCancel={() => setModalOpen(false)}
    >
      <div className={styles.margin}>
        {removingAvatar ? (
          <>
            <p className={styles['modal-text']}>Removing your photo</p>
            <Loader variant='white' className={styles.loader} />
          </>
        ) : (
          <p className={styles['modal-text']}>Do you really want to delete your photo?</p>
        )}
      </div>
    </Modal>
  );
};
