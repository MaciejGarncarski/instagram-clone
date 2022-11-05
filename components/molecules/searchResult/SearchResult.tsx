import { profiles } from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';

import styles from './searchResult.module.scss';

import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';
import { articleVariant } from '@/components/organisms/post/Post';

type SearchResultProps = {
  data: profiles;
};

const MotionLink = motion(Link);

export const SearchResult = ({ data }: SearchResultProps) => {
  const { id, username, full_name } = data;

  return (
    <MotionLink
      variants={articleVariant}
      viewport={{ once: true }}
      whileInView='visible'
      initial='hidden'
      whileFocus={{ scale: 1.05 }}
      href={`/${username}`}
      className={styles.link}
    >
      <div className={styles.container}>
        <UserAvatar userID={id} className={styles.avatar} />
        <div>
          <h3>{full_name}</h3>
          <p>@{username}</p>
        </div>
        <FollowButton userID={id} />
      </div>
    </MotionLink>
  );
};
