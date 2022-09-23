import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useProfile } from '@/hooks/profile/useProfile';

type AddPostMutation = {
  description: string;
  imgURL: string;
  uuid: string;
};

export const useAddPost = () => {
  const { user } = useProfile();
  const router = useRouter();

  return useMutation(
    ({ description, imgURL, uuid }: AddPostMutation) => {
      return axios.put('/api/posts/addPost', { author_id: user?.id, description, imgURL, uuid });
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
