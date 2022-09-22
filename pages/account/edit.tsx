import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { NextPage } from 'next';

import { EditAccount } from '@/components/editAccount/EditAccount';

const EditPage: NextPage<{ user: User }> = () => {
  return <EditAccount />;
};

export const getServerSideProps = withPageAuth({ redirectTo: '/auth/login' });
export default EditPage;
