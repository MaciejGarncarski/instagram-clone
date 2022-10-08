import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { ApiError } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Form, FormValues } from '@/components/organisms/form/Form';

const Login: NextPage = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const { user } = useUser();
  const queryClient = useQueryClient();
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

    await queryClient.invalidateQueries(['profile', { id: user?.id }]);
    toast.success('Logged in!');
    router.replace('/profile/me');
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

export default Login;
