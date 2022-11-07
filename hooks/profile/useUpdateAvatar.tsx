import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Mutation = {
  publicUrl: string;
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation(
    ({ publicUrl }: Mutation) => {
      const now = new Date().getTime();
      const uncachedIMG = `${publicUrl}?cache_bust=${now}`;
      return axios.patch('/api/accounts/updateAvatar', { id: user?.id, avatarURL: uncachedIMG });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
