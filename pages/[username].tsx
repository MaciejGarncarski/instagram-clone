import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useProfileByUsername } from '@/hooks/useProfileByUsername';

import { Loader } from '@/components/atoms/loader/Loader';
import { Account } from '@/components/pages/account/Account';

const UserAccount: NextPage = () => {
  const router = useRouter();

  const username = typeof router.query.username === 'string' ? router.query.username : '';

  const { data, isLoading } = useProfileByUsername(username);

  if (!data || isLoading) {
    return <Loader />;
  }

  return <Account userData={data} />;
};

export default UserAccount;
