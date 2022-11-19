import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

type Mutation = {
  avatar: string | ArrayBuffer | null;
};

export type AvatarRequest = {
  id: string;
  type: 'UPDATE' | 'REMOVE';
  avatar?: string | ArrayBuffer | null;
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation(
    ({ avatar }: Mutation) => {
      return apiClient.postForm<null, null, AvatarRequest>('/accounts/avatar', {
        id: user?.id ?? '',
        avatar,
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
