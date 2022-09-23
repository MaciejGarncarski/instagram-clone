import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useProfile } from './useProfile';

type Mutation = {
  avatarURL: string;
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useProfile();

  const now = new Date().getTime();

  return useMutation(
    ({ avatarURL }: Mutation) => {
      const uncachedIMG = `${avatarURL}?cache_bust=${now}`;
      return axios.patch('/api/profiles/updateAvatar', { id: user?.id, avatarURL: uncachedIMG });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
