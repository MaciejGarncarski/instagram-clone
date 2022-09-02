import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useProfile } from './useProfile';

type Mutation = {
  avatarURL: string;
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useProfile();

  return useMutation(
    ({ avatarURL }: Mutation) => {
      return axios.patch('/api/profiles/updateAvatar', { id: user?.id, avatarURL: avatarURL });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
