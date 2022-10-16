import { useAccountPosts } from '@/hooks/profile/useAccountPosts';

import styles from './accountPostContainer.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccountPost } from '@/components/organisms/accountPost/AccountPost';

type PostProps = {
  userID: string;
};

export const AccountPostContainer = ({ userID }: PostProps) => {
  const { data } = useAccountPosts(userID);

  const allPosts = data?.pages.flatMap((post) => post);

  if (!allPosts) {
    return <Loader />;
  }

  return (
    <main className={styles.posts}>
      {allPosts.map(({ id }) => {
        return <AccountPost key={id} postID={id} userID={userID} />;
      })}
    </main>
  );
};
