import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextPage } from 'next';

import { Account } from '@/components/account/Account';

const UserProfile: NextPage = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
});

export default UserProfile;
