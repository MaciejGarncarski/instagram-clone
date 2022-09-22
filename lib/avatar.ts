import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export const updateAvatar = async (selectedFile: File, userID: string | undefined) => {
  const update = await supabaseClient.storage
    .from('avatars')
    .upload(`${userID}.jpg`, selectedFile, {
      upsert: true,
    });

  return update;
};
