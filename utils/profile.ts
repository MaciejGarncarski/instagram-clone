import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export const getImage = async (fileName: string, setImage: (val: string) => void) => {
  const { signedURL } = await supabaseClient.storage.from('avatars').createSignedUrl(fileName, 60);
  if (signedURL) {
    setImage(signedURL);
  }
};
