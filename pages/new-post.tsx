import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import { NewPost } from '@/components/pages/newPost/NewPost';

const NewPostPage = () => {
  return <NewPost />;
};

export const getServerSideProps = withPageAuth({
  redirectTo: '/auth/login',
});

export default NewPostPage;
