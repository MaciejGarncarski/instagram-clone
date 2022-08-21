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

  const fetcher = async () => {
    const res = await fetch('/api/profiles/getProfile', {
      method: 'POST',
      body: userIdStringified,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('wyjebnalooooo');
  };

  const { data } = useQuery(['profile'], fetcher);

  if (data) {
    return (
      <>
        <NextSeo title='Profile' />
        <main>
          <div>
            <Heading size='h2'>welcome </Heading>
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

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });
