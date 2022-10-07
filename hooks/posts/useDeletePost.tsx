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

  const postMutation = useMutation(({ post_id }: AddPostMutation) => {
    return axios.post('/api/posts/deletePost', { post_id });
  });

  const handleDelete = async (post_id: number, img_uuid: string) => {
    const postDeleting = toast.loading('Deleting post...');

    const { error } = await supabaseClient.storage
      .from('post-images')
      .remove([`${img_uuid}/img.jpg`]);

    if (error) {
      toast.update(postDeleting, {
        render: 'Could not delete post.',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
      return;
    }

    postMutation.mutate(
      { post_id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['posts']);
          await queryClient.invalidateQueries(['posts count']);
          toast.update(postDeleting, {
            render: 'Post deleted!',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          });
        },
        onError: () => {
          toast.update(postDeleting, {
            render: 'Could not delete post.',
            type: 'error',
            isLoading: false,
            autoClose: 4000,
          });
        },
        onSettled: () => setModalOpen(false),
      }
    );
  };

  return { handleDelete };
};
