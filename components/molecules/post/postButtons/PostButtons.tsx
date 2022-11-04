import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark, BiCheck, BiCopyAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { usePostData } from '@/hooks/posts/usePostData';
import { usePostLike } from '@/hooks/posts/usePostLike';

import styles from './postButtons.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { CommentIcon } from '@/components/atoms/icons/CommentIcon';
import { ShareIcon } from '@/components/atoms/icons/ShareIcon';
import { LoginModal } from '@/components/organisms/loginModal/LoginModal';
import { Modal } from '@/components/organisms/modal/Modal';
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
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data } = usePostData(id);
  const { handleLike, isLikedByUser } = usePostLike(id, data?.likesData);
  const user = useUser();

  const showModal = () => {
    setPostModalOpen(true);
  };

  const handlePostLike = () => {
    if (user?.id) {
      handleLike();
    }
    if (!user?.id) {
      setLoginModalOpen(true);
    }
  };

  const openShareModal = () => {
    setShareModalOpen(true);
    setIsCopied(false);
  };

  const buttonsData: Button[] = [
    {
      icon: isLikedByUser ? (
        <AiFillHeart fill='red' stroke='black' strokeWidth={70} />
      ) : (
        <AiOutlineHeart />
      ),
      alt: 'like',
      onClick: handlePostLike,
    },
    {
      icon: <CommentIcon />,
      alt: 'comment',
      onClick: commentCallback ? commentCallback : showModal,
    },
    {
      icon: <ShareIcon />,
      alt: 'share',
      onClick: openShareModal,
    },
    { icon: <BiBookmark />, alt: 'save', className: styles.last },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://delaygram-dev.vercel.app/posts/${id}`);
      toast.success('Copied!');
      setIsCopied(true);
    } catch (error) {
      toast.error("Couldn't copy");
    }
  };

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
      {shareModalOpen && (
        <Modal setIsOpen={setShareModalOpen}>
          <Modal.Button isFirst onClick={handleCopy} disabled={isCopied}>
            <BiCopyAlt /> {isCopied ? 'copied!' : 'copy'}
          </Modal.Button>
          <Modal.Button isLast onClick={() => setShareModalOpen(false)}>
            <BiCheck />
            ok
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
};
