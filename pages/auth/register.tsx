import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextSeo } from 'next-seo';

import { RegisterForm } from '@/components/organisms/registerForm/RegisterForm';

const Register = () => {
  return (
    <>
      <NextSeo title='Register' />
      <RegisterForm />
    </>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return {
        props: { user },
        redirect: { permanent: true, destination: `/` },
      };
    }
    return {
      props: {},
    };
  },
});

export default Register;
