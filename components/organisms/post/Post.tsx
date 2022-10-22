import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/future/image';
import { useState } from 'react';
import { useEffect } from 'react';

import { usePostData } from '@/hooks/posts/usePostData';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './post.module.scss';

import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostComment } from '@/components/molecules/post/postComment/PostComment';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';

type PostProps = {
  id: number;
};

export const Post = ({ id }: PostProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const user = useUser();
  const { data: userData } = useProfile();

  const { data: postData } = usePostData(id);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return () => {
      return window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    };
  }, []);

  if (!postData) {
    return null;
  }

  const { author_id, img } = postData;

  const canShowSettings = author_id === user?.id || userData?.role === 'ADMIN';

  return (
    <article className={styles.container}>
      <PostHeader id={id} canShowSettings={canShowSettings} />
      <figure className={styles.figure}>
        <Image
          className={styles['post-img']}
          src={img}
          alt='post'
          width={300}
          height={270}
          priority
        />
      </figure>
      <PostButtons id={id} />
      <PostFooter id={id} showDescription />
      {windowWidth > 700 && <PostComment id={id} />}
    </article>
  );
};
