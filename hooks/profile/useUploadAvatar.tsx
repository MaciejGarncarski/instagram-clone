import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type Mutation = {
  avatarBase64: string;
};

export type AvatarRequest = {
  id: string;
  type: 'UPDATE' | 'REMOVE';
  avatarBase64?: string;
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation(
    ({ avatarBase64 }: Mutation) => {
      return apiClient.postForm<null, null, AvatarRequest>('/accounts/avatar', {
        id: user?.id ?? '',
        avatarBase64,
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
