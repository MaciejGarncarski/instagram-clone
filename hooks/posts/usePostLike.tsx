import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Likes } from '@/hooks/posts/useGetPostsLikes';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
  user_id?: string;
};

export const usePostLike = (id: number, data?: Likes) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const isLikedByUser = Boolean(user?.id) && data?.likesData?.user_id === user?.id;
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByUser);

  useEffect(() => {
    setIsLiked(isLikedByUser);
  }, [isLikedByUser]);

  const onSuccess = () => queryClient.invalidateQueries(['post', { post_id: id }]);

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
    setIsLiked((prev) => !prev);
    if (isLiked) {
      postDislike.mutate(
        { post_id: id, user_id: user?.id },
        {
          onSuccess,
        }
      );
    }
    if (!isLiked) {
      postLike.mutate(
        { post_id: id },
        {
          onSuccess,
        }
      );
    }
    // queryClient.invalidateQueries(['post', { post_id: id }]);
  };

  return { handleLike, isLiked };
};
