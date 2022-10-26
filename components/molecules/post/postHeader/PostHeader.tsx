import clsx from 'clsx';
import Link from 'next/link';

import { usePostData } from '@/hooks/posts/usePostData';

import styles from './postHeader.module.scss';

import { PostSettings } from '@/components/molecules/post/postSettings/PostSettings';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostHeaderProps = {
  canShowSettings?: boolean;
  borderBottom?: boolean;
  id: number;
};

export const PostHeader = ({ canShowSettings, id, borderBottom }: PostHeaderProps) => {
  const { data: postData } = usePostData(id);

  if (!postData) {
    return null;
  }

  const { author, author_id, location, img_uuid } = postData;

  return (
    <header className={clsx(borderBottom && styles.border, styles.author)}>
      <Link href={`/${author.username}/`} className={styles.avatarLink}>
        <UserAvatar userID={author_id} className={styles.avatar} sizes='40' />
      </Link>
      <div className={styles.links}>
        <Link href={`/${author.username}/`} className={styles.link}>
          <h2 className={styles.username}>
            {(author && author.username) ?? `user-${author.profile_id}`}
          </h2>
        </Link>
        {location && (
          <Link href='/location' className={styles.location}>
            {location}
          </Link>
        )}
      </div>
      {canShowSettings && <PostSettings id={id} author_id={author_id} img_uuid={img_uuid} />}
    </header>
  );
};
