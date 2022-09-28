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

  const isLikedByUser = data?.likesData?.user_id === user?.id;
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByUser);

  const onSuccess = () => {
    queryClient.invalidateQueries(['posts', { post_id: id }]);
    queryClient.invalidateQueries(['posts']);
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    setIsLiked(data?.likesData?.user_id === user?.id);
  }, [data?.likesData?.user_id, user?.id]);

  const postDislike = useMutation(
    ({ post_like_id }: PostLike) => {
      return axios.post('/api/posts/removePostLike', {
        post_like_id,
      });
    },
    {
      onSuccess,
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
      onSuccess,
    }
  );

  const handleLike = () => {
    if (isLiked) {
      postDislike.mutate(
        { post_like_id: data?.likesData?.id },
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
  };

  return { handleLike, isLiked };
};
