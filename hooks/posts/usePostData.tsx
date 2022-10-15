import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { Posts } from '@/hooks/posts/useGetPosts';

export const usePostData = (id: number) => {
  const queryClient = useQueryClient();

  const posts = queryClient.getQueryData<InfiniteData<Posts>>(['posts']);
  const allPosts = posts?.pages.flatMap((post) => post);
  const postData = allPosts?.find((post) => post.id === id);

  return { postData };
};
