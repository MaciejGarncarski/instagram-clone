import { User } from '@supabase/supabase-js';
import { GetServerSideProps, NextPage } from 'next';

import { supabase } from '@/lib/supabase';

import { EditAccount } from '@/components/editAccount/EditAccount';

const EditPage: NextPage<{ user: User }> = () => {
  return <EditAccount />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user === null) {
    return { props: {}, redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: { user } };
};

export default EditPage;
