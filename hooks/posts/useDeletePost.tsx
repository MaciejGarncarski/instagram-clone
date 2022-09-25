import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

type AddPostMutation = {
  post_id: number;
};

export const useDeletePost = () => {
  const queryClient = new QueryClient();

  return useMutation(
    ({ post_id }: AddPostMutation) => {
      return axios.post('/api/posts/deletePost', { post_id });
    },
    {
      onSuccess: () => {
        toast.success('Post removed!');
        queryClient.setQueryData(['posts'], null);
      },
      onError: () => {
        toast.error(`Couldn't delete post`);
      },
    }
  );
};
