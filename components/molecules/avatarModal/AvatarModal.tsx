import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-toastify';

import { useDeleteAvatar } from '@/hooks/profile/useDeleteAvatar';
import { useProfile } from '@/hooks/profile/useProfile';

import { Modal } from '@/components/organisms/modal/Modal';

type AvatarModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const AvatarModal = ({ modalOpen, setModalOpen }: AvatarModalProps) => {
  const { data } = useProfile();
  const { mutate } = useDeleteAvatar();

  const closeModal = () => setModalOpen(false);

  const handleRemovePhoto = async () => {
    if (typeof data?.avatar_url !== 'string') {
      return;
    }

    const removingAvatar = toast.loading('Removing avatar...');
    const { error } = await supabaseClient.storage.from('avatars').remove([data?.avatar_url]);

    if (error) {
      return;
    }

    mutate(undefined, {
      onSettled: () => {
        setModalOpen(false);
      },
      onSuccess: () => {
        toast.update(removingAvatar, {
          render: 'Success!',
          type: 'success',
          isLoading: false,
          autoClose: 4000,
        });
      },
      onError: () => {
        toast.update(removingAvatar, { render: 'Error', type: 'error', isLoading: false });
      },
    });
  };

  return (
    <Modal setIsOpen={setModalOpen}>
      <Modal.Text>Do you really want to delete your photo?</Modal.Text>
      <Modal.Button variant='red' onClick={handleRemovePhoto}>
        Remove photo
      </Modal.Button>
      <Modal.Button onClick={closeModal}>Cancel</Modal.Button>
    </Modal>
  );
};