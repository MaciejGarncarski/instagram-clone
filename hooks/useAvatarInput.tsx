import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';

import { updateAvatar, uploadAvatar } from '@/lib/avatar';
import { useUpdateAvatar } from '@/hooks/useUpdateAvatar';

import { changeAvatarError, userAtom } from '@/store/store';

import { supabase } from '../lib/supabase';

const VALID_IMG_TYPES = ['jpg', 'webp', 'jpeg', 'png'].map((type) => `image/${type}`);

export const useAvatarInput = () => {
  const [user] = useAtom(userAtom);
  const [, setError] = useAtom(changeAvatarError);
  const { isError, mutate } = useUpdateAvatar();

  useEffect(() => {
    if (!isError) {
      setError(null);
    }
    if (isError) {
      setError('Error on image');
    }
  }, [isError, setError]);

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      return null;
    }

    const selectedFile = changeEv.target.files[0];
    const isIMGTypeValid = VALID_IMG_TYPES.includes(selectedFile.type);

    if (!selectedFile.type || !isIMGTypeValid) {
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

    const { signedURL: avatarURL, error: avatarURLError } = await supabase.storage
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

    mutate({ avatarURL: avatarURL });
  };

  return handleChange;
};
