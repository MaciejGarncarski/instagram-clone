// import styles from './post.module.scss';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/future/image';

import { Profile } from '@/hooks/profile/useProfile';

import { Loader } from '@/components/loader/Loader';

type PostProps = {
  id: number;
  userID: string;
};

export const Post = ({ id, userID }: PostProps) => {
  const queryClient = useQueryClient();

  const posts = queryClient.getQueryData<Profile>(['profile', { id: userID }]);
  console.log(posts);
  const postData = posts?.posts.find((post) => post.id === id);
  console.log(postData);

  if (!postData) {
    return <Loader />;
  }

  const { img, description } = postData;

  return (
    <div>
      <Image src={img} width={200} height={200} alt={description} />
    </div>
  );
};
