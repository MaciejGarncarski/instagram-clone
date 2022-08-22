import { profiles } from '@prisma/client';
import { User, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { Heading } from '@/components/heading/Heading';

type ProfileProps = {
  user: User;
  error: string;
};

const Profile: NextPage<ProfileProps> = ({ user }) => {
  const userIdStringified = JSON.stringify({
    id: user.id,
  });

  const fetcher = async (): Promise<profiles> => {
    const res = await fetch('/api/profiles/getProfile', {
      method: 'POST',
      body: userIdStringified,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while loading user profile');
  };

  const { data, error } = useQuery(['profile', { userID: user.id }], fetcher);

  if (error) {
    return (
      <>
        <NextSeo title='Profile' />

        <main>
          <Heading size='h2'>Error</Heading>
        </main>
      </>
    );
  }

  if (data) {
    return (
      <>
        <NextSeo title='Profile' />
        <main>
          <div>
            <Heading size='h2'>welcome </Heading>
            {data.username && <p>{data.username}</p>}

            <Heading size='h2'>Your email is: </Heading>
            <p>{data.email}</p>
          </div>
          <Link href='api/auth/logout'>log out</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <NextSeo title='Loading profile' />
      <main>loading</main>
    </>
  );
};

export default Profile;

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  // async getServerSideProps(ctx) {
  //   const { user } = await getUser(ctx);
  //   return { props: { user: user } };
  // },
});
