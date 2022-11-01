import { posts_likes } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { SinglePostData } from '@/hooks/posts/usePostData';

type PostLike = {
  post_id?: number;
  post_like_id?: number;
  user_id?: string;
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
  const isLikedByUser = data && data?.user_id === user?.id;

  const onSuccess = () => {
    queryClient.invalidateQueries(['single post', id]);
  };

  const postDislike = useMutation(
    ({ post_id, user_id }: PostLike) => {
      return axios.patch('/api/posts/postLike', {
        post_id,
        user_id,
      });
    },
    {
      onMutate: async (newLike) => {
        await queryClient.cancelQueries(['single post', newLike.post_id]);
        const previousLike = queryClient.getQueryData<SinglePostData>([
          'single post',
          newLike.post_id,
        ]);
        queryClient.setQueryData<SinglePostData>(['single post', newLike.post_id], (oldData) =>
          updateFn(oldData, newLike)
        );
        return { previousLike, newLike };
      },
      onError: (err, newLike, context) => {
        queryClient.setQueryData<SinglePostData>(
          ['single post', context?.newLike.post_id],
          context?.previousLike
        );
      },
      onSettled: onSuccess,
    }
  );

  const postLike = useMutation(
    ({ user_id, post_id }: PostLike) => {
      return axios.post('/api/posts/postLike', {
        user_id,
        post_id,
      });
    },
    {
      onMutate: async (newLike) => {
        await queryClient.cancelQueries(['single post', newLike.post_id]);
        const previousLike = queryClient.getQueryData<SinglePostData>([
          'single post',
          newLike.post_id,
        ]);
        queryClient.setQueryData<SinglePostData>(['single post', newLike.post_id], (oldData) =>
          updateFn(oldData, newLike)
        );
        return { previousLike, newLike };
      },
      onError: (err, newLike, context) => {
        queryClient.setQueryData<SinglePostData>(
          ['single post', context?.newLike.post_id],
          context?.previousLike
        );
      },
      onSettled: onSuccess,
    }
  );

  const handleLike = () => {
    if (isLikedByUser) {
      postDislike.mutate({ post_id: id, user_id: user?.id });
    }
    if (!isLikedByUser) {
      postLike.mutate({ post_id: id, user_id: user?.id });
    }
  };

  return { handleLike, isLikedByUser };
};
