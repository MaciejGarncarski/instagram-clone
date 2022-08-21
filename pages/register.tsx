import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ApiError } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { AuthForm, FormValues } from '@/components/auth/authForm/AuthForm';

const Register: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { user, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
    }

    if (user) {
      router.push('/');
    }
  };

  return (
    <>
      <NextSeo title='Register' />
      <main>
        <AuthForm heading='register' onSubmit={onSubmit} error={error} />
      </main>
    </>
  );
};

export default Register;
