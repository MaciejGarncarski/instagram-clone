import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { apiClient } from '@/lib/apiClient';
import { useProfileByUsername } from '@/hooks/useProfileByUsername';

import { Loader } from '@/components/atoms/loader/Loader';
import { Account } from '@/components/pages/account/Account';

const UserAccount = () => {
  const router = useRouter();

  const username = typeof router.query.username === 'string' ? router.query.username : '';

  const { data, isLoading } = useProfileByUsername(username);

  if (!data || isLoading) {
    return <Loader />;
  }

  return <Account userData={data} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['profile', { id: ctx.params?.id ?? '' }], async () => {
    const { data } = await apiClient.post('/accounts/getUserByUsername', {
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
