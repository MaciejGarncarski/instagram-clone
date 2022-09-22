import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useProfile } from './useProfile';

type AddPostMutation = {
  description: string;
  imgURL: string;
};

export const useAddPost = () => {
  const { user } = useProfile();
  const router = useRouter();

  return useMutation(
    ({ description, imgURL }: AddPostMutation) => {
      return axios.put('/api/posts/addPost', { author_id: user?.id, description, imgURL });
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
