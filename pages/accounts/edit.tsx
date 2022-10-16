import { getUser } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext, NextPage } from 'next';

import { apiClient } from '@/lib/apiClient';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditPage: NextPage<{ user: User }> = () => {
  useAuthRedirect();

  return <EditAccount />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { user } = await getUser(ctx);

  await queryClient.prefetchQuery(['profile', { id: user.id }], async () => {
    const { data } = await apiClient.post('/accounts/getProfile', {
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
