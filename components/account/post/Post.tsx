// import styles from './post.module.scss';

import Image from 'next/future/image';

import { useProfile } from '@/hooks/profile/useProfile';

import { Loader } from '@/components/loader/Loader';

type PostProps = {
  postID: number;
  userID: string;
};

export const Post = ({ postID, userID }: PostProps) => {
  const { data } = useProfile(userID);

  if (!data?.posts) {
    return <Loader />;
  }

  const postData = data.posts.find(({ id }) => id === postID);

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
