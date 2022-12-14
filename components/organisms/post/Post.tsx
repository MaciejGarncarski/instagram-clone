import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';

import { usePostData } from '@/hooks/posts/usePostData';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './post.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostComment } from '@/components/molecules/post/postComment/PostComment';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { imageKitLoader } from '@/components/organisms/postModal/PostModal';

type PostProps = {
  id: number;
};

export const articleVariant: Variants = {
  hidden: {
    y: -10,
    opacity: 0.6,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
    },
  },
};

export const Post = ({ id }: PostProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const user = useUser();
  const { data: userData } = useProfile();
  const { data: postData } = usePostData(id);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return () => {
      return window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    };
  }, []);

  if (!postData || !postData.post) {
    return null;
  }

  const { author_id, img, author } = postData.post;

  const isOwner = author_id === user?.id;
  const canShowSettings = isOwner || userData?.role === 'ADMIN';

  return (
    <motion.article
      variants={articleVariant}
      viewport={{ once: true }}
      whileInView='visible'
      initial='hidden'
      className={styles.container}
    >
      <PostHeader id={id} canShowSettings={canShowSettings} />
      <figure className={styles.figure}>
        {!isImgLoaded && <Loader />}
        <Image
          className={clsx(styles['post-img'], !isImgLoaded && 'visually-hidden')}
          src={img}
          loader={imageKitLoader}
          alt={`${author.username}'s post`}
          width={300}
          height={270}
          onLoad={() => setIsImgLoaded(true)}
          priority
        />
      </figure>
      <PostButtons id={id} />
      <PostFooter id={id} showDescription />
      {windowWidth > 700 && <PostComment id={id} />}
    </motion.article>
  );
};
