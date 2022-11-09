import { followers } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { apiClient } from '@/lib/apiClient';
import { useProfile } from '@/hooks/profile/useProfile';
import { useProfileByUsername } from '@/hooks/useProfileByUsername';

import styles from './followButton.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

type FollowButtonProps = {
  userID: string;
  className?: string;
};

type FollowMutation = Pick<followers, 'from' | 'to'>;

export const FollowButton = ({ userID, className }: FollowButtonProps) => {
  const queryClient = useQueryClient();
  const currentUser = useUser();
  const { data } = useProfile(userID);
  const { data: dataByUsername } = useProfileByUsername(data?.username ?? '');

  const isFollowing = dataByUsername?.isFollowing;
  const canShowFollowBtn = currentUser?.id && currentUser?.id !== userID;

  const { mutate, isLoading } = useMutation(
    async ({ from, to }: FollowMutation) => {
      if (isFollowing) {
        return apiClient.delete(`/follow?from=${from}&to=${to}`);
      }
      return apiClient.put(`/follow?from=${from}&to=${to}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['profile', { username: data?.username }]);
        queryClient.invalidateQueries(['profile', { id: userID }]);
        queryClient.invalidateQueries(['single post']);
      },
    }
  );

  const onClick = () => {
    if (!currentUser?.id) {
      return;
    }
    mutate({ from: currentUser?.id, to: userID });
  };

  if (!canShowFollowBtn || dataByUsername?.isFollowing === undefined) {
    return null;
  }

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <motion.button
      initial={{ opacity: 0.7, scale: 0.7, rotate: 5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      onClick={onClick}
      type='button'
      className={clsx(className, styles.button)}
    >
      {isFollowing ? 'unfollow' : 'follow'}
    </motion.button>
  );
};
