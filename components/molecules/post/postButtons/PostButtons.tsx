import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark, BiComment, BiShare } from 'react-icons/bi';

import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';
import { usePostLike } from '@/hooks/posts/usePostLike';

import styles from './postButtons.module.scss';

type Button = {
  icon: ReactNode;
  alt: string;
  className?: string;
  onClick?: () => void;
};

type ButtonProps = {
  id: number;
};

export const PostButtons = ({ id }: ButtonProps) => {
  const { data } = useGetPostsLikes(id);

  const { handleLike, isLiked } = usePostLike(id, data);

  console.log(id, isLiked);

  const buttonsData: Button[] = [
    {
      icon: isLiked ? <AiFillHeart fill='red' /> : <AiOutlineHeart />,
      alt: 'like',
      onClick: handleLike,
    },
    { icon: <BiComment style={{ transform: 'scaleX(-1)' }} />, alt: 'comment' },
    { icon: <BiShare style={{ transform: 'scaleX(-1)' }} />, alt: 'share' },
    { icon: <BiBookmark />, alt: 'save', className: styles.last },
  ];
  return (
    <div className={styles.buttons}>
      {buttonsData.map(({ icon, alt, className, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
            onClick={onClick ? onClick : () => null}
            key={alt}
            type='button'
            className={clsx(styles.button, className ?? '')}
          >
            <span className='sr-only'>{alt}</span>
            {icon}
          </motion.button>
        );
      })}
    </div>
  );
};
