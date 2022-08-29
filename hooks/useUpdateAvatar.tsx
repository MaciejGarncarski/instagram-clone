import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useUser } from './useUser';

type Mutation = {
  avatarURL: string;
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    ({ avatarURL }: Mutation) => {
      return axios.patch('/api/profiles/updateAvatar', { id: user?.id, avatarURL: avatarURL });
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
