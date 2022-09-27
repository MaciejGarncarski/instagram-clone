// import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';

import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { Account } from '@/components/account/Account';

const UserProfile: NextPage = () => {
  useAuthRedirect();
  return <Account />;
};

export default UserProfile;
