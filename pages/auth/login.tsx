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

export default Login;
