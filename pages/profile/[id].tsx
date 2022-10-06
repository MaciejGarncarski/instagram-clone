import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Account } from '@/components/pages/account/Account';

const UserAccount: NextPage = () => {
  const router = useRouter();

  const userID = typeof router.query.id === 'string' ? router.query.id : '';

  return <Account userID={userID} />;
};

export default UserAccount;
