import { useUser } from '@supabase/auth-helpers-react';

import { useGetComments } from '@/hooks/posts/useGetComments';
import { usePostData } from '@/hooks/posts/usePostData';
import { useProfile } from '@/hooks/profile/useProfile';

export const usePostModal = (postID: number) => {
  const { data: commentsData, hasNextPage, fetchNextPage } = useGetComments(postID);
  const user = useUser();
  const { data: currentUser } = useProfile();
  const { data: postData } = usePostData(postID);

  return { postData, currentUser, user, commentsData, hasNextPage, fetchNextPage };
};
