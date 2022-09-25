// import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';

import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { Account } from '@/components/account/Account';

const UserProfile: NextPage = () => {
  useAuthRedirect();
  return <Account />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const { user } = await getUser(ctx);

  if (!user?.id) {
    return {
      props: {},
    };
  }

  queryClient.prefetchQuery(['profile'], async () => {
    const { data } = await axios.post('/api/profiles/getProfile', {
      id: user?.id,
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
