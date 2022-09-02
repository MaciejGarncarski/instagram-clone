import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';

import { Account } from '@/components/account/Account';

type UserType = {
  user: User;
};

const UserProfile: NextPage<UserType> = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
});

export default UserProfile;
