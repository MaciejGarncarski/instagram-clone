import { profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import { useEffect, useState } from 'react';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { useGetPostsLikes } from '@/hooks/posts/useGetPostsLikes';
import { usePostLike } from '@/hooks/posts/usePostLike';

import styles from './post.module.scss';

import { Button } from '@/components/common/button/Button';
import { Modal } from '@/components/modal/Modal';

import { postModalAtom } from '@/store/store';

import likeImg from '~/images/favorite.svg';
import dislikeImg from '~/images/not-liked.svg';

type PostProps = {
  id: number;
  img: string;
  img_uuid: string;
  description: string;
  author_id: string;
  author?: profiles;
};

export const Post = ({ id, img, img_uuid, description, author, author_id }: PostProps) => {
  const [modalOpen, setModalOpen] = useAtom(postModalAtom);
  const { user } = useUser();
  const { handleDelete } = useDeletePost();
  const { data } = useGetPostsLikes(id);
  const userID = user?.id;
  const queryClient = useQueryClient();
  const { postDislike, postLike } = usePostLike();
  const isLikedByUser = data?.likesData?.user_id === userID;
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByUser);

  useEffect(() => {
    setIsLiked(data?.likesData?.user_id === userID);
  }, [data?.likesData?.user_id, userID]);

  const onSuccess = () => {
    queryClient.invalidateQueries(['posts', { post_id: id }]);
    queryClient.invalidateQueries(['posts']);
    setIsLiked((prev) => !prev);
  };

  const handleLike = () => {
    if (isLiked) {
      postDislike.mutate(
        { post_like_id: data?.likesData?.id },
        {
          onSuccess,
        }
      );
    }
    if (!isLiked) {
      postLike.mutate(
        { post_id: id },
        {
          onSuccess,
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      {author && <h2>{author.username}</h2>}
      <figure key={id} className={styles.post}>
        <Image
          className={styles['post-img']}
          src={img}
          priority
          alt='post'
          width={240}
          height={500}
        />
        <div className={styles.likes}>
          <button className={styles.like} type='button' onClick={handleLike}>
            {isLiked ? (
              <Image src={likeImg} width={30} height={30} alt='likes' />
            ) : (
              <Image src={dislikeImg} width={30} height={30} alt='likes' />
            )}
          </button>
          <span>{data?.likes}</span>
        </div>
        <figcaption>{description}</figcaption>
        {userID === author_id && (
          <div className={styles.overlay}>
            <Button type='button' className={styles.delete} onClick={() => setModalOpen(true)}>
              Delete post
            </Button>
            {modalOpen && (
              <Modal
                onCancel={() => setModalOpen(false)}
                onAccept={() => handleDelete(id, img_uuid)}
                cancelText='no'
                acceptText='yes'
              >
                Are you sure?
              </Modal>
            )}
          </div>
        )}
      </figure>
    </div>
  );
};
