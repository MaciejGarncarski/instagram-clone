import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

import { useDeleteAvatar } from '@/hooks/profile/useDeleteAvatar';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './avatarSection.module.scss';

import { Loader } from '@/components/loader/Loader';
import { Modal } from '@/components/modal/Modal';

type AvatarModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const AvatarModal = ({ modalOpen, setModalOpen }: AvatarModalProps) => {
  const { data } = useProfile();
  const { mutate } = useDeleteAvatar();
  const [removingAvatar, setRemovingAvatar] = useState<boolean>(false);

  const closeModal = () => setModalOpen(false);

  const handleRemovePhoto = async () => {
    if (typeof data?.avatar_url !== 'string') {
      return;
    }

    const { error } = await supabaseClient.storage.from('avatars').remove([data?.avatar_url]);

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
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      // onAccept={handleRemovePhoto}
      // onCancel={() => setModalOpen(false)}
    >
      {removingAvatar ? (
        <>
          <Modal.Text>Removing your photo</Modal.Text>
          <Loader variant='white' className={styles.loader} />
        </>
      ) : (
        <Modal.Text>Do you really want to delete your photo?</Modal.Text>
      )}

      <Modal.Button variant='red' onClick={handleRemovePhoto}>
        Remove photo
      </Modal.Button>
      <Modal.Button onClick={closeModal}>Cancel</Modal.Button>
    </Modal>
  );
};
