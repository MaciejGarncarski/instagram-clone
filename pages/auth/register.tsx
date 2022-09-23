import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { ApiError } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Form, FormValues } from '@/components/auth/form/Form';

const Register: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);

  const { user } = useUser();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const { user, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
    }
    if (user) {
      toast.success('Registered!');
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    router.replace('/account', undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <NextSeo title='Register' />
      <main id='main'>
        <Form heading='register' onSubmit={onSubmit} authError={error} />
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

export default Register;
