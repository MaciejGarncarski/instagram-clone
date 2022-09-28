import { useProfile } from '@/hooks/profile/useProfile';

import styles from './posts.module.scss';

import { Loader } from '@/components/loader/Loader';

export const Posts = () => {
  const { data } = useProfile();

  if (!data) {
    return <Loader />;
  }

  return (
    <section aria-labelledby='user posts' className={styles.posts}>
      xd
    </section>
  );
};
