import { motion, Variants } from 'framer-motion';

import { useAccountPosts } from '@/hooks/profile/useAccountPosts';

import styles from './accountPostContainer.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccountPost } from '@/components/organisms/accountPost/AccountPost';

type PostProps = {
  userID: string;
};

const containerVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const AccountPostContainer = ({ userID }: PostProps) => {
  const { data } = useAccountPosts(userID);

  const allPosts = data?.pages.flatMap((post) => post.posts);

  if (!allPosts) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      className={styles.posts}
    >
      {allPosts.map(({ id }) => {
        return <AccountPost key={id} postID={id} userID={userID} />;
      })}
    </motion.div>
  );
};
