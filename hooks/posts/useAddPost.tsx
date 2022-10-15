import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  description: string;
  imgURL: string;
  uuid: string;
  location?: string;
};

export const useAddPost = () => {
  const { user } = useUser();
  const router = useRouter();

  return useMutation(
    ({ description, imgURL, uuid, location }: AddPostMutation) => {
      return apiClient.put('/posts/addPost', {
        author_id: user?.id,
        description,
        imgURL,
        uuid,
        location,
      });
    },
    {
      onSuccess: () => router.replace('/'),
    }
  );
};
