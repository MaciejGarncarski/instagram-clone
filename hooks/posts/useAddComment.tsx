import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type AddPostMutation = {
  id: number;
  text: string;
};

export const useAddComment = () => {
  const user = useUser();

  const queryClient = useQueryClient();

  return useMutation(
    ({ id, text }: AddPostMutation) => {
      return apiClient.put('/comments/addComment', {
        user_id: user?.id,
        post_id: id,
        text,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['comments']);
      },
    }
  );
};
