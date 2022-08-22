import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const fetcher = async (userIDStringified: string): Promise<profiles> => {
  const res = await fetch('api/profiles/getProfile', {
    method: 'POST',
    body: userIDStringified,
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Error while loading user profile');
};

export const useProfile = (userID: string) => {
  const userIDStringified = JSON.stringify({
    id: userID,
  });

  const { data, error, refetch } = useQuery(['my-profile'], () => fetcher(userIDStringified));

  return { data, error, refetch };
};
