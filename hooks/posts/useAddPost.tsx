import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  description: string;
  location?: string;
  imageFile: Blob;
};

export const imageBase64 = async (blob: Blob) =>
  await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

export const useAddPost = () => {
  const user = useUser();

  return useMutation(async ({ imageFile, description, location }: AddPostMutation) => {
    const image = await imageBase64(imageFile);

    return apiClient.post('/posts/upload', {
      authorID: user?.id,
      imageFile: image,
      location,
      description,
    });
  });
};
