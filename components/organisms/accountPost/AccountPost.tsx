import { useUser } from '@supabase/auth-helpers-react';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { BiComment, BiHeart } from 'react-icons/bi';

import { namedComponent } from '@/lib/namedComponent';
import { useAccountPosts } from '@/hooks/profile/useAccountPosts';

import styles from './accountPost.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { LoginModal } from '@/components/organisms/loginModal/LoginModal';

type PostProps = {
  postID: number;
  userID: string;
};

const postVariant: Variants = {
  hidden: {
    scale: 0.7,
    opacity: 0,
    rotate: -4,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
};

const PostModal = dynamic(() =>
  namedComponent(import('@/components/organisms/postModal/PostModal'), 'PostModal')
);

export const AccountPost = ({ postID, userID }: PostProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [LoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const user = useUser();

  const { data } = useAccountPosts(userID);
  const allPosts = data?.pages.flatMap((post) => post);
  const postData = allPosts?.find((post) => post.id === postID);

  const onClick = () => {
    if (user) {
      setModalOpen(true);
    }
    if (!user) {
      setLoginModalOpen(true);
    }
  };

  if (!postData) {
    return <Loader />;
  }

  const { _count, img, description, id } = postData;

  return (
    <motion.div variants={postVariant} className={styles.container}>
      <div onClick={onClick} className={styles.overlay}>
        <div className={styles.stat}>
          <BiHeart /> {_count.posts_likes}
        </div>
        <div className={styles.stat}>
          <BiComment /> {_count.posts_comments}
        </div>
      </div>
      <Image
        src={img}
        width={200}
        height={200}
        priority
        className={styles.image}
        alt={description}
      />
      {LoginModalOpen && <LoginModal setIsOpen={setLoginModalOpen} />}
      {isModalOpen && <PostModal setIsOpen={setModalOpen} id={id} />}
    </motion.div>
  );
};
