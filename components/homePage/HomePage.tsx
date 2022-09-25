import Image from 'next/future/image';
import { useState } from 'react';

import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Loader } from '@/components/loader/Loader';

import defaultIMG from '~/images/account.svg';

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
      {data.map((post) => {
        return (
          <article key={post.id} className={styles.post}>
            {isImgLoading && <Loader />}
            <div className={styles['avatar-section']}>
              <Image
                className={styles.avatar}
                src={post.author.avatar_url ?? defaultIMG}
                width={50}
                height={50}
                alt='author profile picture'
              />
              <h2 className={styles.author}>{post.author.username ?? 'no username'}</h2>
            </div>
            <figure>
              <Image
                src={post.img}
                className={styles.img}
                alt='post image'
                width={300}
                height={400}
                priority
                onLoad={() => setIsImgLoading(false)}
              />
              <figcaption className={styles.figcaption}>{post.description}</figcaption>
            </figure>
          </article>
        );
      })}
    </main>
  );
};
