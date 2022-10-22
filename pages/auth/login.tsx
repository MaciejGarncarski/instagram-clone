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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const user = await getUser(ctx);
//   if (user) {
//     return {
//       props: { user },
//       redirect: { permanent: true, destination: `/` },
//     };
//   }
//   return { props: { user } };
// };

export default Login;
