import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from 'react-toastify';

import { useDeleteAvatar } from '@/hooks/profile/useDeleteAvatar';
import { useProfile } from '@/hooks/profile/useProfile';

import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { DeleteIcon } from '@/components/atoms/icons/DeleteIcon';
import { Modal } from '@/components/organisms/modal/Modal';

type AvatarModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const AvatarModal = ({ setModalOpen }: AvatarModalProps) => {
  const { data } = useProfile();
  const { mutate } = useDeleteAvatar();
  const { supabaseClient } = useSessionContext();

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
      <Modal.Text isFirst>Do you really want to delete your photo?</Modal.Text>
      <Modal.Button variant='red' onClick={handleRemovePhoto}>
        <DeleteIcon />
        Remove photo
      </Modal.Button>
      <Modal.Button isLast onClick={closeModal}>
        <CancelIcon />
        Cancel
      </Modal.Button>
    </Modal>
  );
};
