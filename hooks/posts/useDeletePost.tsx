import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { postModalAtom } from '@/store/store';

type AddPostMutation = {
  post_id: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const [, setModalOpen] = useAtom(postModalAtom);

  const postMutation = useMutation(
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

  const handleDelete = async (post_id: number, img_uuid: string) => {
    const { error } = await supabaseClient.storage
      .from('post-images')
      .remove([`${img_uuid}/img.jpg`]);

    if (error) {
      toast.error('error while deleting post');
      return;
    }

    postMutation.mutate(
      { post_id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile']);
        },
        onSettled: () => setModalOpen(false),
      }
    );
  };

  return { handleDelete };
};
