import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ApiError } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { AuthForm, FormValues } from '@/components/auth/authForm/AuthForm';

const Login: NextPage = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { user, error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
    }

    if (user) {
      router.push('/', undefined, { shallow: true });
    }
  };

  return (
    <>
      <NextSeo title='Login' />
      <main>
        <AuthForm heading='login' onSubmit={onSubmit} error={error} />
      </main>
    </>
  );
};

export default Login;
