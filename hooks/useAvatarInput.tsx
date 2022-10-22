import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { useUpdateAvatar } from '@/hooks/profile/useUpdateAvatar';

export const useAvatarInput = () => {
  const { mutate } = useUpdateAvatar();
  const user = useUser();
  const { supabaseClient } = useSessionContext();

  const [error, setError] = useState<string | null>(null);

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files || !changeEv.target.files[0]) {
      return null;
    }

    const selectedFile = changeEv.target.files[0];

    setError(null);
    if (!selectedFile.type) {
      return null;
    }

    const addingImage = toast.loading('Uploading new image...');

    const { error } = await supabaseClient.storage
      .from('avatars')
      .upload(`${user?.id}.webp`, selectedFile, {
        upsert: true,
      });

    if (error) {
      toast.error('Error occurred when uploading avatar');
      return;
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('avatars').getPublicUrl(`${user?.id}.webp`);

    if (!publicUrl) {
      setError('Error occurred when uploading avatar');
      return;
    }

    mutate(
      { publicUrl },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === 'string') {
              setError(error.response.data);
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
      }
    );
  };

  return { handleChange, error };
};
