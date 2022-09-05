import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

import { updateAvatar, uploadAvatar } from '@/lib/avatar';
import { useUpdateAvatar } from '@/hooks/useUpdateAvatar';

import { useProfile } from './useProfile';

export const VALID_IMG_TYPES = ['jpg', 'jpeg', 'png'].map((type) => `image/${type}`);

export const useAvatarInput = () => {
  const { mutate } = useUpdateAvatar();
  const { user } = useProfile();

  const [error, setError] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files || !changeEv.target.files[0]) {
      return null;
    }

    setError(null);
    setIsUpdated(false);
    const selectedFile = changeEv.target.files[0];
    const isIMGTypeValid = VALID_IMG_TYPES.includes(selectedFile.type);

    if (!selectedFile.type) {
      return null;
    }

    if (!isIMGTypeValid) {
      setError('Invalid image type!');
      return;
    }

    const { error: updateError } = await updateAvatar(selectedFile, user?.id);

    if (updateError) {
      const { error: uploadError } = await uploadAvatar(selectedFile, user?.id);

      if (uploadError) {
        setError('Error occurred when uploading avatar');
        return;
      }
    }

    const { signedURL: avatarURL, error: avatarURLError } = await supabaseClient.storage
      .from('avatars')
      .createSignedUrl(`${user?.id}.jpg`, 31536000);

    if (avatarURLError) {
      setError('Error occurred when uploading avatar');
      return;
    }

    if (!avatarURL) {
      setError('Error while downloading avatar');
      return;
    }

    mutate(
      { avatarURL: avatarURL },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === 'string') {
              setError(error.response?.data);
            }
          }
        },
        onSuccess: () => setIsUpdated(true),
      }
    );
  };

  return { handleChange, isUpdated, error };
};
