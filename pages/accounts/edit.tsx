import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditPage = () => {
  return <EditAccount />;
};

export const getServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
  async getServerSideProps(ctx, supabase) {
    const queryClient = new QueryClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await queryClient.prefetchQuery(['profile', { id: user?.id }], async () => {
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
  },
});

export default EditPage;
