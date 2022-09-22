import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';

import { NewPost } from '@/components/newPost/NewPost';

const NewPostPage: NextPage = () => {
  return <NewPost />;
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
});

export default NewPostPage;
