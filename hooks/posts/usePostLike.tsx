import { posts_likes } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
  user_id?: string;
};

export const usePostLike = (id: number, data?: posts_likes) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const isLikedByUser = data && data?.user_id === user?.id;

  const onSuccess = () => {
    queryClient.invalidateQueries(['postLikeData']);
    queryClient.invalidateQueries(['posts']);
    queryClient.invalidateQueries(['single post']);
  };

  const postDislike = useMutation(
    ({ post_id, user_id }: PostLike) => {
      return axios.post('/api/posts/removePostLike', {
        post_id,
        user_id,
      });
    },
    { onSuccess }
  );

  const postLike = useMutation(
    ({ post_id }: PostLike) => {
      return axios.post('/api/posts/addPostLike', {
        user_id: user?.id,
        post_id,
      });
    },

    { onSuccess }
  );

  const handleLike = () => {
    if (isLikedByUser) {
      postDislike.mutate(
        { post_id: id, user_id: user?.id },
        {
          onSuccess,
        }
      );
    }
    if (!isLikedByUser) {
      postLike.mutate(
        { post_id: id },
        {
          onSuccess,
        }
      );
    }
  };

  return { handleLike, isLikedByUser };
};
