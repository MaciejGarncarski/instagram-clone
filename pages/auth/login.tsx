import { ApiError } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { supabase } from '@/lib/supabase';

import { Form, FormValues } from '@/components/auth/form/Form';

const Login: NextPage = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
      return null;
    }

    router.push('/account');
  };

  return (
    <>
      <NextSeo title='Login' />
      <main>
        <Form heading='login' onSubmit={onSubmit} error={error} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: { user }, redirect: { permanent: false, destination: '/account' } };
  }
  return { props: {} };
};

export default Login;
