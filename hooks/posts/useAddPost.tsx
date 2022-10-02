import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  description: string;
  imgURL: string;
  uuid: string;
};

export const useAddPost = () => {
  const { user } = useUser();
  const router = useRouter();

  return useMutation(
    ({ description, imgURL, uuid }: AddPostMutation) => {
      return apiClient.put('/posts/addPost', { author_id: user?.id, description, imgURL, uuid });
    },
    {
      onSuccess: () => {
        router.replace('/');
        toast.success('Post added!');
      },
      onError: () => {
        toast.error(`Couldn't add post`);
      },
    }
  );
};
