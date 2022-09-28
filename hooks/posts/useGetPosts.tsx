import { posts, profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Post = {
  author: profiles;
} & posts;

export const useGetPosts = () => {
  const { user } = useUser();

  const posts = useQuery<Post[] | undefined>(
    ['posts'],
    async () => {
      const { data } = await axios.get('/api/posts/getPosts');
      return data;
    },
    { refetchOnWindowFocus: false }
  );

  return { user, ...posts };
};
