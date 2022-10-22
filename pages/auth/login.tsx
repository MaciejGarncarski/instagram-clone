import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextSeo } from 'next-seo';

import { LoginForm } from '@/components/organisms/loginForm/LoginForm';

const Login = () => {
  return (
    <>
      <NextSeo title='Login' />
      <LoginForm />
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

export default Login;
