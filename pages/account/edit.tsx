import { User } from '@supabase/supabase-js';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, NextPage } from 'next';

import { supabase } from '@/lib/supabase';

import { EditAccountForm } from '@/components/editAccountForm/EditAccountForm';

import { userAtom } from '@/store/store';

const EditPage: NextPage<{ user: User }> = ({ user }) => {
  useHydrateAtoms([[userAtom, user]]);
  return <EditAccountForm />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user === null) {
    return { props: {}, redirect: { destination: '/auth/login' } };
  }
  return { props: { user } };
};

export default EditPage;
