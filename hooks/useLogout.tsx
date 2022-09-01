import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useUser } from './useUser';

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    () => {
      return axios.patch('/api/logout');
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
