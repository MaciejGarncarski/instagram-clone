import { NextPage } from 'next';
import { useRouter } from 'next/router';

const UserAccount: NextPage = () => {
  const router = useRouter();

  return <p>{JSON.stringify(router.query)}</p>;
};

export default UserAccount;
