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

export default Register;
