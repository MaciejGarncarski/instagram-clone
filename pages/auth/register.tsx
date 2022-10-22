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
export default Register;
