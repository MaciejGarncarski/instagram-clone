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
      return axios.post('/api/accounts/avatar', {
        id: user?.id,
        avatarURL: uncachedIMG,
        type: 'UPDATE',
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
