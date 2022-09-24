import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ApiError } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Form, FormValues } from '@/components/auth/form/Form';

const Login: NextPage = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
      return;
    }
    toast.success('Logged in!');
  };

  return (
    <>
      <NextSeo title='Login' />
      <main id='main'>
        <Form heading='login' onSubmit={onSubmit} authError={error} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await getUser(ctx);
  if (user) {
    return { props: { user }, redirect: { permanent: true, destination: '/account' } };
  }
  return { props: { user } };
};

export default Login;
