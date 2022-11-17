import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';
import { AvatarRequest } from '@/hooks/profile/useUploadAvatar';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation(
    () => {
      return apiClient.post<null, null, AvatarRequest>('/accounts/avatar', {
        id: user?.id ?? '',
        type: 'REMOVE',
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
