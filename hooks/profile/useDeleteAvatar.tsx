import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation(
    () => {
      return axios.patch('/api/accounts/deleteAvatar', { id: user?.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
