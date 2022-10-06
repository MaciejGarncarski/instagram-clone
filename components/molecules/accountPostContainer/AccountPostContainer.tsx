import { useProfile } from '@/hooks/profile/useProfile';

import styles from './accountPostContainer.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccountPost } from '@/components/organisms/accountPost/AccountPost';

type PostProps = {
  userID: string;
};

export const AccountPostContainer = ({ userID }: PostProps) => {
  const { data } = useProfile(userID);

  if (!data) {
    return <Loader />;
  }

  return (
    <main className={styles.posts}>
      {data.posts.map(({ id }) => {
        return <AccountPost key={id} postID={id} userID={userID} />;
      })}
    </main>
  );
};
