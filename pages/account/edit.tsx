import { getUser } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';

import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { EditAccount } from '@/components/editAccount/EditAccount';

const EditPage: NextPage<{ user: User }> = () => {
  useAuthRedirect();
  return <EditAccount />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const { user } = await getUser(ctx);

  queryClient.prefetchQuery(['profile'], async () => {
    const { data } = await axios.post('/api/profiles/getProfile', {
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

export default EditPage;
