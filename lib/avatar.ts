import { supabase } from './supabase';

export const updateAvatar = async (selectedFile: File, userID: string | undefined) => {
  const { error } = await supabase.storage.from('avatars').update(`${userID}.jpg`, selectedFile, {
    cacheControl: '10080',
    upsert: false,
  });

  return { error };
};

export const uploadAvatar = async (selectedFile: File, userID: string | undefined) => {
  const { error } = await supabase.storage.from('avatars').upload(`${userID}.jpg`, selectedFile, {
    cacheControl: '10080',
    upsert: false,
  });

  return { error };
};
