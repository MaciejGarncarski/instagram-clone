import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import { getProfile } from '@/hooks/useUser';

import { Account } from '@/components/account/Account';

type UserType = {
  user: User;
};

const UserProfile: NextPage<UserType> = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
  async getServerSideProps(ctx) {
    const queryClient = new QueryClient();
    const { user } = await getUser(ctx);

    await queryClient.prefetchQuery(['profile'], () => getProfile(user.id));
    return { props: { user, dehydratedState: dehydrate(queryClient) } };
  },
});

export default UserProfile;
