import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { ApiError } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { supabase } from '@/lib/supabase';

import { Form, FormValues } from '@/components/auth/form/Form';

const Register: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
    }
    if (user) {
      router.push('/account');
    }
  };

  return (
    <>
      <NextSeo title='Register' />
      <main>
        <Form heading='register' onSubmit={onSubmit} authError={error} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({ redirectTo: '/account' });
export default Register;
