import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { userAtom } from '@/store/store';

const fetcher = async (userIDStringified: string): Promise<profiles | null> => {
  const res = await fetch('/api/profiles/getProfile', {
    method: 'POST',
    body: userIDStringified,
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Error while loading user profile');
};

export const useProfile = () => {
  const [user] = useAtom(userAtom);

  const userIDStringified = JSON.stringify({
    id: user?.id,
  });

  const profile = useQuery([`profile ${user?.id}`], () => {
    return fetcher(userIDStringified);
  });

  return { ...profile };
};
