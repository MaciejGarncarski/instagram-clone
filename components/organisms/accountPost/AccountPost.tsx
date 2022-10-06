import Image from 'next/future/image';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountPost.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

type PostProps = {
  postID: number;
  userID: string;
};

export const AccountPost = ({ postID, userID }: PostProps) => {
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
    <div className={styles.container}>
      <Image src={img} width={200} height={200} className={styles.image} alt={description} />
    </div>
  );
};
