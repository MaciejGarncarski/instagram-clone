import { NextPage } from 'next';

import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { NewPost } from '@/components/newPost/NewPost';

const NewPostPage: NextPage = () => {
  useAuthRedirect();
  return <NewPost />;
};

export default NewPostPage;
