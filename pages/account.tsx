import { User } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';

import { supabase } from '@/lib/supabase';

import { Account } from '@/components/account/Account';

type UserType = {
  user: User;
};

const UserProfile: NextPage<UserType> = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user === null) {
    return { props: {}, redirect: { destination: '/auth/login' } };
  }
  return { props: { user } };
};

export default UserProfile;
