import { followers } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteData } from '@/lib/getInfiniteData';
import { useProfileByUsername } from '@/hooks/useProfileByUsername';

type UseFollowersProps = {
  username: string;
};

type FollowersResult = {
  followers: Array<followers>;
  following: Array<followers>;
};

const RESULTS_PER_SCROLL = 5;

export const useFollowers = ({ username }: UseFollowersProps) => {
  const { data } = useProfileByUsername(username);

  return useInfiniteQuery(
    ['account modal', data?.profile.id],
    ({ pageParam = 0 }) =>
      getInfiniteData<FollowersResult>({
        url: '/getFollowers',
        pageParam,
        perScroll: RESULTS_PER_SCROLL,
        additionalData: {
          userID: data?.profile.id ?? '',
        },
      }),
    {
      getNextPageParam: (_, allFollowers) => {
        const followingCount = data?.profile._count.fromUser;
        const followersCount = data?.profile._count.toUser;

        if (!followingCount || !followersCount) {
          return undefined;
        }

        if (
          followingCount < allFollowers.length * RESULTS_PER_SCROLL ||
          followersCount < allFollowers.length * RESULTS_PER_SCROLL
        ) {
          return undefined;
        }

        return allFollowers.length * RESULTS_PER_SCROLL;
      },
    }
  );
};
