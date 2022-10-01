// import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSidePropsContext, NextPage } from 'next';

import { apiClient } from '@/lib/apiClient';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { Account } from '@/components/account/Account';

const UserProfile: NextPage = () => {
  useAuthRedirect();
  return <Account />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { user } = await getUser(ctx);

  queryClient.prefetchQuery(['profile'], async () => {
    const { data } = await apiClient.post('/profiles/getProfile', {
      id: user?.id ?? '',
    });

    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserProfile;
