import { useSessionContext } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { updateToast } from '@/lib/updateToast';

import { postModalAtom } from '@/store/store';

type DeletePostMutation = {
  post_id: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const [, setModalOpen] = useAtom(postModalAtom);
  const { supabaseClient } = useSessionContext();

  const postMutation = useMutation(({ post_id }: DeletePostMutation) => {
    return axios.post('/api/posts/deletePost', { post_id });
  });

  const handleDelete = async (post_id: number, img_uuid: string) => {
    const postDeleting = toast.loading('Deleting post...');

    const { error } = await supabaseClient.storage
      .from('post-images')
      .remove([`${img_uuid}/img.webp`]);

    const updateToastError = () =>
      updateToast({ toastId: postDeleting, text: 'Could not delete post.', type: 'error' });

    if (error) {
      updateToastError();
      return;
    }

    postMutation.mutate(
      { post_id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(['homepage posts']);
          await queryClient.invalidateQueries(['account posts']);
          toast.update(postDeleting, {
            render: 'Post deleted!',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          });
        },
        onError: updateToastError,
        onSettled: () => setModalOpen(false),
      }
    );
  };

  return { handleDelete };
};
