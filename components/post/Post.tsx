import { profiles } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/future/image';

import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';

import styles from './post.module.scss';

import { Buttons } from '@/components/post/buttons/Buttons';
import { PostSettings } from '@/components/post/postSettings/PostSettings';

type PostProps = {
  id: number;
  img: string;
  img_uuid: string;
  description: string;
  author_id: string;
  author?: profiles;
  created_at: Date;
};

dayjs.extend(relativeTime);

export const Post = ({
  id,
  img,
  img_uuid,
  description,
  author,
  author_id,
  created_at,
}: PostProps) => {
  const { data } = useGetPostsLikes(id);
  const createdAt = dayjs(created_at).fromNow();

  return (
    <div className={styles.container}>
      <PostSettings id={id} author_id={author_id} img_uuid={img_uuid} />
      <div className={styles.author}>
        <Image
          className={styles.avatar}
          src={author?.avatar_url ?? ''}
          alt={`${author?.username} profile picture`}
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
                <span className={styles.bold}>{data?.likes}</span>
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
