import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import Link from 'next/link';

import { usePostData } from '@/hooks/posts/usePostData';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './postHeader.module.scss';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { PostSettings } from '@/components/molecules/post/postSettings/PostSettings';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

type PostHeaderProps = {
  canShowSettings?: boolean;
  isOwner?: boolean;
  borderBottom?: boolean;
  id: number;
};

export const PostHeader = ({ canShowSettings, id, borderBottom }: PostHeaderProps) => {
  const user = useUser();
  const { data: postData } = usePostData(id);
  const { data } = useProfile();

  if (!postData) {
    return null;
  }

  const { author, author_id, location } = postData.post;
  const changeSettingsLayout = data?.role === 'ADMIN' && author_id !== user?.id;

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
      {user?.id !== author_id && (
        <FollowButton loaderClassName={styles.loader} userID={author_id} />
      )}
      {canShowSettings && (
        <PostSettings id={id} author_id={author_id} changeSettingsLayout={changeSettingsLayout} />
      )}
    </header>
  );
};
