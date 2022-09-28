import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { updateAvatar } from '@/lib/avatar';
import { useProfile } from '@/hooks/profile/useProfile';
import { useUpdateAvatar } from '@/hooks/profile/useUpdateAvatar';

const IMG_EXTENSIONS = ['jpg', 'jpeg', 'png'];
export const IMG_EXTENSIONS_DOTS = IMG_EXTENSIONS.map((ext) => `.${ext}`);
export const IMG_TYPES = IMG_EXTENSIONS.map((type) => `image/${type}`);

export const useAvatarInput = () => {
  const { mutate } = useUpdateAvatar();
  const { user } = useProfile();

  const [error, setError] = useState<string | null>(null);

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files || !changeEv.target.files[0]) {
      return null;
    }

    setError(null);

    const selectedFile = changeEv.target.files[0];
    const isIMGTypeValid = IMG_TYPES.includes(selectedFile.type);

    if (!selectedFile.type) {
      return null;
    }

    if (!isIMGTypeValid) {
      setError('Invalid image type!');
      return;
    }

    const { error: updateError } = await updateAvatar(selectedFile, user?.id);

    if (updateError) {
      toast.error('Error occurred when uploading avatar');
      return;
    }

    const { publicURL: avatarURL, error: avatarURLError } = supabaseClient.storage
      .from('avatars')
      .getPublicUrl(`${user?.id}.jpg`);

    if (avatarURLError) {
      setError('Error occurred when uploading avatar');
      return;
    }

    if (!avatarURL) {
      setError('Error while downloading avatar');
      return;
    }

    mutate(
      { avatarURL },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === 'string') {
              setError(error.response.data);
              toast.error(error.response.data);
            }
          }
        },
        onSuccess: () => toast.success('Updated profile picture'),
      }
    );
  };

  return { handleChange, error };
};
