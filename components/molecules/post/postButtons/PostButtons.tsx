import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark, BiComment, BiShare } from 'react-icons/bi';

import { lockScroll } from '@/lib/scrollLock';
import { usePostLike } from '@/hooks/posts/usePostLike';
import { usePostLikesData } from '@/hooks/posts/usePostLikesData';

import styles from './postButtons.module.scss';

import { LoginModal } from '@/components/organisms/loginModal/LoginModal';
import { PostModal } from '@/components/organisms/postModal/PostModal';

type Button = {
  icon: ReactNode;
  alt: string;
  className?: string;
  onClick?: () => void;
};

type ButtonProps = {
  id: number;
  commentCallback?: () => void;
};

export const PostButtons = ({ id, commentCallback }: ButtonProps) => {
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const { data } = usePostLikesData(id);
  const { handleLike, isLikedByUser } = usePostLike(id, data);
  const user = useUser();

  const showModal = () => {
    lockScroll();
    setPostModalOpen(true);
  };

  const handlePostLike = () => {
    if (user?.id) {
      handleLike();
      return;
    }
    if (!user?.id) {
      setLoginModalOpen(true);
    }
  };

  const buttonsData: Button[] = [
    {
      icon: isLikedByUser ? <AiFillHeart fill='red' /> : <AiOutlineHeart />,
      alt: 'like',
      onClick: handlePostLike,
    },
    {
      icon: <BiComment style={{ transform: 'scaleX(-1)' }} />,
      alt: 'comment',
      onClick: commentCallback ? commentCallback : showModal,
    },
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
            <span className='visually-hidden'>{alt}</span>
            {icon}
          </motion.button>
        );
      })}
      {loginModalOpen && <LoginModal setIsOpen={setLoginModalOpen} />}
      {postModalOpen && <PostModal setIsOpen={setPostModalOpen} id={id} />}
    </div>
  );
};
