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
      return axios.patch('/api/accounts/updateAvatar', { id: user?.id, avatarURL: publicUrl });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
