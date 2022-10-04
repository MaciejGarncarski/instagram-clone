import { useUser } from '@supabase/auth-helpers-react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/future/image';
import Link from 'next/link';

import { Posts } from '@/hooks/posts/useGetPosts';
import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';

import styles from './post.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Loader } from '@/components/loader/Loader';
import { Buttons } from '@/components/post/buttons/Buttons';
import { PostSettings } from '@/components/post/postSettings/PostSettings';

type PostProps = {
  id: number;
};

dayjs.extend(relativeTime);

export const Post = ({ id }: PostProps) => {
  const { user } = useUser();
  const { data } = useGetPostsLikes(id);
  const queryClient = useQueryClient();

  const posts = queryClient.getQueryData<InfiniteData<Posts>>(['posts']);
  const allPosts = posts?.pages.flatMap((post) => post);
  const postsData = allPosts?.find((post) => post.id === id);

  if (!postsData) {
    return <Loader />;
  }

  const createdAt = dayjs(postsData.created_at).fromNow();

  const { author, author_id, img, img_uuid, description } = postsData;

  return (
    <div className={styles.container}>
      <div className={styles.author}>
        <Link href={`/profile/${author_id}`}>
          <a className={styles.link}>
            <UserAvatar userID={author_id} className={styles.avatar} />
            <h2 className={styles.username}>
              {(author && author.username) ?? `user-${author.profile_id}`}
            </h2>
          </a>
        </Link>
        {author_id === user?.id && (
          <PostSettings id={id} author_id={author_id} img_uuid={img_uuid} />
        )}
      </div>
      <figure key={id} className={styles.post}>
        <Image
          className={styles['post-img']}
          src={img}
          alt='post'
          width={240}
          height={500}
          priority
        />
        <Buttons id={id} />
        <div className={styles.footer}>
          <p className={styles.likes}>
            {data?.likes !== 0 && data?.likes && (
              <>
                <span className={styles.bold}>{data.likes}</span>
                <span>{data?.likes > 1 ? 'likes' : 'like'}</span>
              </>
            )}
          </p>
          <figcaption className={styles.description}>
            <span className={styles.bold}>{author?.username}</span> {description}
          </figcaption>
          <p className={styles.created}>{createdAt}</p>
        </div>
      </figure>
    </div>
  );
};
