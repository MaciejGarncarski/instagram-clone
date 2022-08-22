import { getUser, supabaseClient, User, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { ChangeEvent } from 'react';

import { useProfile } from '@/hooks/useProfile';

import { Heading } from '@/components/heading/Heading';
import { UserAvatar } from '@/components/profile/userAvatar/UserAvatar';

import loading from '~/dancing.gif';

type ProfileProps = {
  user: User;
  error: string;
};

const Profile: NextPage<ProfileProps> = ({ user }) => {
  const { data: userData, error, refetch } = useProfile(user.id);
  const fileName = `${user.id}.jpg`;

  const subscribe = async (signedURL: string | null) => {
    const res = await fetch('api/profiles/updateAvatar', {
      method: 'POST',
      body: JSON.stringify({
        id: user.id,
        avatarUrl: signedURL,
      }),
    });
    if (!res.ok) {
      throw new Error('Error occured while updating user avatar');
    }
    return res.json();
  };

  const mutation = useMutation(subscribe, { onSuccess: () => refetch() });

  const mutateAvatar = async () => {
    const { signedURL } = await supabaseClient.storage
      .from('avatars')
      .createSignedUrl(fileName, 10080);
    mutation.mutate(signedURL);
    await refetch();
  };

  const handleAvatar = async (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      return;
    }

    const avatarFile = changeEv.target.files[0];
    const isImageExisting = userData?.avatar_url;

    if (isImageExisting) {
      await supabaseClient.storage.from('avatars').update(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: false,
      });
    }

    if (!isImageExisting) {
      await supabaseClient.storage.from('avatars').upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: false,
      });
    }

    await mutateAvatar();
  };

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

  if (userData) {
    return (
      <>
        <NextSeo title='Profile' />
        <main>
          <button onClick={() => refetch()}>refetch</button>
          <div>
            <Heading size='h2'>welcome </Heading>
            {userData.username && <p>{userData.username}</p>}

            <Heading size='h2'>Your email is: </Heading>
            <p>{userData.email}</p>
          </div>
          <Link href='api/auth/logout'>log out</Link>

          <UserAvatar
            handleAvatar={handleAvatar}
            width={200}
            height={200}
            src={userData.avatar_url || loading}
            alt={`${user.email} profile picture`}
          />
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
  async getServerSideProps(ctx) {
    const { accessToken } = await getUser(ctx);
    return { props: { accessToken } };
  },
});
