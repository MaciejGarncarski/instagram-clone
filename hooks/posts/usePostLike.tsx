import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
};

export const usePostLike = () => {
  const { user } = useUser();

  const postLike = useMutation(
    ({ post_id }: PostLike) => {
      return axios.post('/api/posts/addPostLike', {
        user_id: user?.id,
        post_id,
      });
    },
    {
      onSuccess: () => {
        console.log('success like');
      },
      onError: (error) => {
        console.error('no success like', error);
      },
    }
  );

  const postDislike = useMutation(
    ({ post_like_id }: PostLike) => {
      return axios.post('/api/posts/removePostLike', {
        post_like_id,
      });
    },
    {
      onSuccess: () => {
        console.log('success dislike');
      },
      onError: (error) => {
        console.error('no success dislike', error);
      },
    }
  );

  return { postDislike, postLike };
};
