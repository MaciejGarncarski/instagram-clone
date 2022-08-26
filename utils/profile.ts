import { supabase } from '@/lib/supabase';

export const getImage = async (fileName: string, setImage: (val: string) => void) => {
  const { signedURL } = await supabase.storage.from('avatars').createSignedUrl(fileName, 60);
  if (signedURL) {
    setImage(signedURL);
  }
};
