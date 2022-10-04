import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Likes } from '@/hooks/posts/useGetPostsLikes';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
};

export const usePostLike = (id: number, data?: Likes) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const isLikedByUser = Boolean(user?.id) && data?.likesData?.user_id === user?.id;
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByUser);

  const onSuccess = (type: 'like' | 'dislike') => {
    queryClient.setQueryData<Likes>(['post', { post_id: id }], (oldData) => {
      if (!oldData) {
        return undefined;
      }

      if (type === 'dislike') {
        return {
          ...oldData,
          likes: oldData.likes - 1,
        };
      }

      return {
        ...oldData,
        likes: oldData.likes + 1,
      };
    });

    queryClient.invalidateQueries(['post', { post_id: id }]);
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    setIsLiked(isLikedByUser);
  }, [isLikedByUser]);

  const postDislike = useMutation(
    ({ post_like_id }: PostLike) => {
      return axios.post('/api/posts/removePostLike', {
        post_like_id,
      });
    },
    {
      onSuccess: () => onSuccess('dislike'),
    }
  );

  const postLike = useMutation(
    ({ post_id }: PostLike) => {
      return axios.post('/api/posts/addPostLike', {
        user_id: user?.id,
        post_id,
      });
    },
    {
      onSuccess: () => onSuccess('like'),
    }
  );

  const handleLike = () => {
    if (isLiked) {
      postDislike.mutate({ post_like_id: data?.likesData?.id });
    }
    if (!isLiked) {
      postLike.mutate({ post_id: id });
    }
  };

  return { handleLike, isLiked };
};
