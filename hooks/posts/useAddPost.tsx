import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  description: string;
  publicUrl: string;
  uuid: string;
  location?: string;
};

export const useAddPost = () => {
  const user = useUser();

  return useMutation(async ({ description, publicUrl, uuid, location }: AddPostMutation) => {
    return apiClient.patch('/posts/post', {
      type: 'CREATE',
      author_id: user?.id,
      description,
      publicUrl,
      uuid,
      location,
    });
  });
};
