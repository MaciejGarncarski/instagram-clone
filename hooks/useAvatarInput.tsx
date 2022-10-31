import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useUpdateAvatar } from '@/hooks/profile/useUpdateAvatar';

export const useAvatarInput = () => {
  const { mutate } = useUpdateAvatar();
  const user = useUser();
  const { supabaseClient } = useSessionContext();

  const uploadNewImage = async (file: Blob | null, resetState: () => void) => {
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const addingImage = toast.loading('Uploading new image...');

    const { error } = await supabaseClient.storage
      .from('avatars')
      .upload(`${user?.id}.webp`, file, {
        upsert: true,
      });

    if (error) {
      toast.error('Error occurred when uploading avatar');
      return;
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('avatars').getPublicUrl(`${user?.id}.webp`);

    mutate(
      { publicUrl },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === 'string') {
              toast.error(error.response.data);
            }
          }
        },
        onSuccess: () => {
          toast.update(addingImage, {
            render: 'Updated profile picture',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          });
        },
        onSettled: resetState,
      }
    );
  };

  return { uploadNewImage };
};
