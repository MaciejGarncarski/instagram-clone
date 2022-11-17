import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  description: string;
  uuid: string;
  location?: string;
  imageFile: string;
};

export const useAddPost = () => {
  const user = useUser();

  return useMutation(async ({ uuid, imageFile, description, location }: AddPostMutation) => {
    return apiClient.postForm('/posts/post', {
      type: 'CREATE',
      authorID: user?.id,
      imageFile,
      uuid,
      location,
      description,
    });
  });
};
