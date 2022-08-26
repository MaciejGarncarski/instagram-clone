import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';

import { useUpdateAvatar } from '@/hooks/useUpdateAvatar';

import { userAtom } from '@/store/store';

import { supabase } from '../lib/supabase';

export const useHandleChange = (setError: (error: string) => void) => {
  const [user] = useAtom(userAtom);
  const avatarMutation = useUpdateAvatar();

  useEffect(() => {
    if (avatarMutation.isError) {
      setError('Error on image');
    }
  }, [avatarMutation.isError, setError]);

  const handleChange = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      return null;
    }

    const selectedFile = changeEv.target.files[0];

    if (!selectedFile.type) {
      return null;
    }

    const { error } = await supabase.storage
      .from('avatars')
      .update(`${user?.id}.jpg`, selectedFile, {
        cacheControl: '10080',
        upsert: false,
      });

    if (error) {
      setError('Error occurred when uploading avatar');
      return null;
    }

    const { signedURL: avatarURL, error: avatarURLError } = await supabase.storage
      .from('avatars')
      .createSignedUrl(`${user?.id}.jpg`, 3600);

    if (avatarURLError) {
      setError('Error occurred when uploading avatar');
      return null;
    }

    if (!avatarURL) {
      setError('Error while downloading avatar');
      return null;
    }

    avatarMutation.mutate({ avatarURL: avatarURL });
  };

  return handleChange;
};
