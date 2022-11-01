import { profiles } from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';

import styles from './searchResult.module.scss';

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
        <BiLinkExternal className={styles.icon} />
      </div>
    </MotionLink>
  );
};
