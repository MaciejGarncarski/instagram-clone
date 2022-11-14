import { followers } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { apiClient } from '@/lib/apiClient';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './followButton.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

type FollowButtonProps = {
  userID: string;
  className?: string;
  loaderClassName?: string;
};

type FollowMutation = Pick<followers, 'from' | 'to'>;

export const FollowButton = ({ userID, className, loaderClassName }: FollowButtonProps) => {
  const currentUser = useUser();
  const { isFollowing, isLoading } = useProfile(userID);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isMutationLoading } = useMutation(
    async ({ from, to }: FollowMutation) => {
      const url = `/follow?from=${from}&to=${to}`;
      if (isFollowing) {
        return apiClient.delete(url);
      }
      return apiClient.put(url);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['profile']);
        queryClient.invalidateQueries(['post']);
      },
    }
  );

  const onClick = () => {
    if (isMutationLoading) {
      return;
    }
    if (currentUser?.id) {
      mutate({ from: currentUser?.id, to: userID });
    }
  };

  const canShowFollowBtn = currentUser?.id && currentUser?.id !== userID;
  if (!canShowFollowBtn || typeof isFollowing === 'undefined') {
    return null;
  }

  if (isLoading || isMutationLoading) {
    return <Loader variant='small' className={loaderClassName} />;
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
