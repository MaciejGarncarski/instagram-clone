import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';

import { updateAvatar, uploadAvatar } from '@/lib/avatar';
import { useUpdateAvatar } from '@/hooks/useUpdateAvatar';

import { changeAvatarError } from '@/store/store';

import { useProfile } from './useProfile';

const VALID_IMG_TYPES = ['jpg', 'webp', 'jpeg', 'png'].map((type) => `image/${type}`);

export const useAvatarInput = () => {
  const { user } = useProfile();
  const [, setError] = useAtom(changeAvatarError);

  const { mutate } = useUpdateAvatar();

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files || !changeEv.target.files[0]) {
      return null;
    }

    const selectedFile = changeEv.target.files[0];
    const isIMGTypeValid = VALID_IMG_TYPES.includes(selectedFile.type);

    if (!selectedFile.type) {
      return null;
    }

    if (!isIMGTypeValid) {
      setError('Invalid image type!');
      return null;
    }

    const { error: updateError } = await updateAvatar(selectedFile, user?.id);

    if (updateError) {
      const { error: uploadError } = await uploadAvatar(selectedFile, user?.id);

      if (uploadError) {
        setError('Error occurred when uploading avatar');
        return null;
      }
    }

    const { signedURL: avatarURL, error: avatarURLError } = await supabaseClient.storage
      .from('avatars')
      .createSignedUrl(`${user?.id}.jpg`, 31536000);

    if (avatarURLError) {
      setError('Error occurred when uploading avatar');
      return null;
    }

    if (!avatarURL) {
      setError('Error while downloading avatar');
      return null;
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
      }
    );
  };

  return handleChange;
};
