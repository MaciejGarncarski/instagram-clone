import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';

import { userAtom } from '@/store/store';

export const useProfile = () => {
  const [user] = useAtom(userAtom);
  const getProfile: () => Promise<profiles> = async () => {
    const response = await axios.post('/api/profiles/getProfile', {
      id: user?.id,
    });
    return response.data;
  };

  const profile = useQuery(['profile'], getProfile);
  return { ...profile };
};
