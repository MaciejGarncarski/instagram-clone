import { posts_likes } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { apiClient } from '@/lib/apiClient';
import { SinglePostData } from '@/hooks/posts/usePostData';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
  user_id?: string;
  dislike?: true;
};

const updateFn = (oldData?: SinglePostData, newData?: PostLike) => {
  if (!newData || !oldData) {
    return;
  }

  const { post_like_id, post_id, user_id } = newData;

  if (!post_like_id || !post_id || !user_id) {
    return;
  }

  const newLike: SinglePostData = {
    post: {
      ...oldData?.post,
    },
    likesData: {
      id: post_like_id,
      user_id: user_id,
      post_id: post_id,
    },
  };
  return newLike;
};

export const usePostLike = (id: number, data?: posts_likes) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(
    (data && data?.user_id === user?.id) ?? false
  );

  const onSuccess = () => {
    setIsLikedByUser((prev) => !prev);
    queryClient.invalidateQueries(['post', id]);
  };

  const postLike = useMutation(
    ({ user_id, post_id, dislike }: PostLike) => {
      if (dislike) {
        return apiClient.patch('/posts/postLike', {
          user_id,
          post_id,
        });
      }

      return apiClient.post('/posts/postLike', {
        user_id,
        post_id,
      });
    },
    {
      onMutate: async (newLike) => {
        await queryClient.cancelQueries(['post', newLike.post_id]);
        const previousLike = queryClient.getQueryData<SinglePostData>(['post', newLike.post_id]);
        queryClient.setQueryData<SinglePostData>(['post', newLike.post_id], (oldData) =>
          updateFn(oldData, newLike)
        );
        return { previousLike, newLike };
      },
      onError: (err, newLike, context) => {
        queryClient.setQueryData<SinglePostData>(
          ['post', context?.newLike.post_id],
          context?.previousLike
        );
      },
      onSuccess,
    }
  );

  const handleLike = () => {
    if (isLikedByUser) {
      postLike.mutate({ post_id: id, user_id: user?.id, dislike: true });
    }
    if (!isLikedByUser) {
      postLike.mutate({ post_id: id, user_id: user?.id });
    }
  };

  return { handleLike, isLikedByUser };
};
