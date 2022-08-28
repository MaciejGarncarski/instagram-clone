import { User } from '@supabase/supabase-js';
import { useHydrateAtoms } from 'jotai/utils';
import type { GetServerSideProps, NextPage } from 'next';

import { supabase } from '@/lib/supabase';

import { Account } from '@/components/account/Account';

import { userAtom } from '@/store/store';

type UserType = {
  user: User;
};

const UserProfile: NextPage<UserType> = ({ user }) => {
  useHydrateAtoms([[userAtom, user]]);
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
