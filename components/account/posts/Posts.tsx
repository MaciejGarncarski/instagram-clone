import { useProfile } from '@/hooks/profile/useProfile';

import styles from './posts.module.scss';

import { Post } from '@/components/account/post/Post';
import { Loader } from '@/components/loader/Loader';

type PostProps = {
  userID: string;
};

export const Posts = ({ userID }: PostProps) => {
  const { data } = useProfile(userID);

  if (!data) {
    return <Loader />;
  }

  return (
    <main className={styles.posts}>
      {data.posts.map(({ id }) => {
        return <Post key={id} postID={id} userID={userID} />;
      })}
    </main>
  );
};
