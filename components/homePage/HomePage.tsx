import { useState } from 'react';

import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Loader } from '@/components/loader/Loader';
import { Post } from '@/components/post/Post';

export const HomePage = () => {
  const { data, isLoading } = useGetPosts();
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);

  if (isLoading || !data) {
    return <Loader />;
  }

  if (data.length < 1) {
    return <h2>No posts yet.</h2>;
  }

  return (
    <main id='main' className={styles.container}>
      {data.map(({ id, author_id, author, description, img_uuid, img, created_at }) => {
        return (
          <Post
            key={id}
            id={id}
            author={author}
            author_id={author_id}
            description={description}
            img_uuid={img_uuid}
            img={img}
            created_at={created_at}
          />
        );
      })}
    </main>
  );
};
