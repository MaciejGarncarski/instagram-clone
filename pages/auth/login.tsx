import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ApiError } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Form, FormValues } from '@/components/auth/form/Form';

const Login: NextPage = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
      return;
    }

    setTimeout(() => {
      router.push('/account');
    }, 1000);
  };

  return (
    <>
      <NextSeo title='Login' />
      <main>
        <Form heading='login' onSubmit={onSubmit} authError={error} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await getUser(ctx);
  if (user) {
    return { props: { user }, redirect: { permanent: false, destination: '/account' } };
  }
  return { props: { user } };
};

export default Login;
