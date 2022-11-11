import { followers } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteData } from '@/lib/getInfiniteData';

import { AccountModalVariant } from '@/components/molecules/modals/accountModal/AccountModal';

type UseFollowersProps = {
  userID: string;
  variant: AccountModalVariant;
};

type Count = {
  _count: {
    id: number;
  };
};

type FollowersResult = {
  followers: Array<followers>;
  following: Array<followers>;
  followingCount: Count;
  followersCount: Count;
};

const RESULTS_PER_SCROLL = 5;

export const useFollowers = ({ userID, variant }: UseFollowersProps) => {
  return useInfiniteQuery(
    ['account modal', userID, variant],
    ({ pageParam = 0 }) =>
      getInfiniteData<FollowersResult>({
        url: '/accounts/getFollowers',
        pageParam,
        perScroll: RESULTS_PER_SCROLL,
        additionalData: {
          userID,
        },
      }),
    {
      getNextPageParam: (prevFollowers, allFollowers) => {
        const followingCount = prevFollowers.followersCount._count.id;
        const followersCount = prevFollowers.followersCount._count.id;

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
