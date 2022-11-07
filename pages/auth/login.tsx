import { NextSeo } from 'next-seo';

import { LoginForm } from '@/components/organisms/loginForm/LoginForm';

const Login = () => {
  return (
    <>
      <NextSeo title='Log in' />
      <LoginForm />
    </>
  );
};

export default Login;
