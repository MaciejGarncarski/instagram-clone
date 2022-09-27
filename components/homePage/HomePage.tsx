import { useState } from 'react';

import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Post } from '@/components/account/posts/post/Post';
import { Loader } from '@/components/loader/Loader';

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
      {data.map(({ id, author_id, author, description, img_uuid, img }) => {
        return (
          <Post
            key={id}
            id={id}
            author={author}
            author_id={author_id}
            description={description}
            img_uuid={img_uuid}
            img={img}
          />
        );
      })}
    </main>
  );
};
