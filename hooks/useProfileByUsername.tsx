import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';
import { Profile } from '@/hooks/profile/useProfile';

export const useProfileByUsername = (username: string) => {
  const profile = useQuery<Profile | undefined>(['profile', { username }], async () => {
    const { data } = await apiClient.post('/accounts/getUserByUsername', {
      username,
    });

    return data;
  });

  return { ...profile };
};
