import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/future/image';

import { Posts } from '@/hooks/posts/useGetPosts';
import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';

import styles from './post.module.scss';

import { Loader } from '@/components/loader/Loader';
import { Buttons } from '@/components/post/buttons/Buttons';
import { PostSettings } from '@/components/post/postSettings/PostSettings';

type PostProps = {
  id: number;
};

dayjs.extend(relativeTime);

export const Post = ({ id }: PostProps) => {
  const { data } = useGetPostsLikes(id);
  const queryClient = useQueryClient();

  const posts = queryClient.getQueryData<InfiniteData<Posts>>(['posts']);
  const allPosts = posts?.pages.flatMap((post) => post.post);
  const postsData = allPosts?.find((post) => post.id === id);

  if (!postsData) {
    return <Loader />;
  }

  const createdAt = dayjs(postsData.created_at).fromNow();

  const { author, author_id, img, img_uuid, description } = postsData;

  return (
    <div className={styles.container}>
      <PostSettings id={id} author_id={author_id} img_uuid={img_uuid} />
      <div className={styles.author}>
        <Image
          className={styles.avatar}
          src={author.avatar_url ?? ''}
          alt={`${author.username} profile picture`}
          width={35}
          height={35}
          priority
        />
        <h2 className={styles.username}>{author && author.username}</h2>
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
