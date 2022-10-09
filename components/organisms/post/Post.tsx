import { useUser } from '@supabase/auth-helpers-react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import Image from 'next/future/image';
import Link from 'next/link';

import { Posts } from '@/hooks/posts/useGetPosts';
import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './post.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { PostSettings } from '@/components/molecules/post/postSettings/PostSettings';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostProps = {
  id: number;
};

dayjs.extend(relativeTime);

export const Post = ({ id }: PostProps) => {
  const { user } = useUser();
  const { data: userData } = useProfile();
  const { data } = useGetPostsLikes(id);

  const queryClient = useQueryClient();

  const posts = queryClient.getQueryData<InfiniteData<Posts>>(['posts']);
  const allPosts = posts?.pages.flatMap((post) => post);
  const postData = allPosts?.find((post) => post.id === id);

  if (!postData) {
    return <Loader />;
  }
  const { author, author_id, img, img_uuid, description } = postData;

  const createdAt = dayjs(postData.created_at).fromNow();
  const postDate = dayjs(postData.created_at).format('YYYY/MM/DD');
  const canShowSettings = author_id === user?.id || userData?.role === 'ADMIN';

  return (
    <article className={styles.container}>
      <header className={styles.author}>
        <Link href={`/${author.username}`} passHref>
          <motion.a whileTap={{ y: -2, scale: 0.9 }} className={styles.link}>
            <UserAvatar userID={author_id} className={styles.avatar} sizes='40' />
            <h2 className={styles.username}>
              {(author && author.username) ?? `user-${author.profile_id}`}
            </h2>
          </motion.a>
        </Link>
        {canShowSettings && <PostSettings id={id} author_id={author_id} img_uuid={img_uuid} />}
      </header>
      <div key={id} className={styles.post}>
        <figure className={styles.figure}>
          <Image
            className={styles['post-img']}
            src={img}
            alt='post'
            width={240}
            height={500}
            priority
          />
        </figure>
        <PostButtons id={id} />
        <footer className={styles.footer}>
          {data?.likes !== 0 && data?.likes && (
            <p className={styles.likes}>
              <span className={styles.bold}>{data.likes}</span>
              <span>{data?.likes > 1 ? 'likes' : 'like'}</span>
            </p>
          )}
          <p className={styles.description}>
            <span className={styles.bold}>{author?.username ?? `user-${author.profile_id}`}</span>
            {description}
          </p>
          <time dateTime={postDate} className={styles.created}>
            {createdAt}
          </time>
        </footer>
      </div>
    </article>
  );
};
