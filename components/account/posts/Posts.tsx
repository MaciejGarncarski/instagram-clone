import { useProfile } from '@/hooks/profile/useProfile';

import styles from './posts.module.scss';

import { Post } from '@/components/account/posts/post/Post';
import { Loader } from '@/components/loader/Loader';

export const Posts = () => {
  const { data } = useProfile();

  if (!data) {
    return <Loader />;
  }

  const { posts } = data;

  return (
    <section aria-labelledby='user posts' className={styles.posts}>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            author_id={post.author_id}
            description={post.description}
            img={post.img}
            img_uuid={post.img_uuid}
          />
        );
      })}
    </section>
  );
};
