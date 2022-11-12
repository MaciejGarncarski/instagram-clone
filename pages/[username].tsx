import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { apiClient } from '@/lib/apiClient';

import { Account } from '@/components/pages/account/Account';

const UserAccount = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['profile', { id: ctx.params?.id ?? '' }], async () => {
    const { data } = await apiClient.post('/accounts/getProfileByUsername', {
      username: ctx.params?.username ?? '',
    });

    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserAccount;
