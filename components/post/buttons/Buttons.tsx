import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/future/image';

import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';
import { usePostLike } from '@/hooks/posts/usePostLike';

import styles from '../post.module.scss';

import saveImg from '~/images/bookmark.svg';
import commentImg from '~/images/chat.svg';
import likeImg from '~/images/liked.svg';
import disLikeImg from '~/images/not-liked.svg';
import shareImg from '~/images/send.svg';

type Button = {
  img: StaticImageData;
  alt: string;
  className?: string;
  onClick?: () => void;
};

type ButtonProps = {
  id: number;
};

export const Buttons = ({ id }: ButtonProps) => {
  const { data } = useGetPostsLikes(id);

  const { handleLike, isLiked } = usePostLike(id, data);

  const buttonsData: Button[] = [
    { img: isLiked ? likeImg : disLikeImg, alt: 'like', onClick: handleLike },
    { img: commentImg, alt: 'comment' },
    { img: shareImg, alt: 'share' },
    { img: saveImg, alt: 'save', className: styles.last },
  ];
  return (
    <div className={styles.buttons}>
      {buttonsData.map(({ img, alt, className, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
            onClick={onClick}
            key={alt}
            type='button'
            className={clsx(styles.button, className ?? '')}
          >
            <Image src={img} width={35} height={35} alt={alt} />
          </motion.button>
        );
      })}
    </div>
  );
};
