import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return axios('/api/auth/logout');
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(['profile'], null);
      },
    }
  );
};
