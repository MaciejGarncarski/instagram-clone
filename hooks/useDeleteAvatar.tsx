import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return axios.patch('/api/profiles/deleteAvatar');
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
