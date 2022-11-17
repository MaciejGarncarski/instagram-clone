import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { apiClient } from '@/lib/apiClient';
import { updateToast } from '@/lib/updateToast';

import { postModalAtom } from '@/store/store';

type DeletePostMutation = {
  post_id: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const [, setModalOpen] = useAtom(postModalAtom);

  const postMutation = useMutation(({ post_id }: DeletePostMutation) => {
    return apiClient.post('/posts/post', { type: 'REMOVE', post_id });
  });

  const handleDelete = async (post_id: number) => {
    const postDeleting = toast.loading('Deleting post...');

    const updateToastError = () =>
      updateToast({ toastId: postDeleting, text: 'Could not delete post.', type: 'error' });

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
