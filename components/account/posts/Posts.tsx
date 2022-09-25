import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/future/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './posts.module.scss';

import { Button } from '@/components/common/button/Button';
import { Loader } from '@/components/loader/Loader';
import { Modal } from '@/components/modal/Modal';

export const Posts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate } = useDeletePost();
  const { data } = useProfile();
  const queryCliennt = useQueryClient();

  if (!data) {
    return <Loader />;
  }

  const { posts } = data;

  const handleDelete = async (post_id: number, img_uuid: string) => {
    const { error } = await supabaseClient.storage
      .from('post-images')
      .remove([`${img_uuid}/img.jpg`]);

    if (error) {
      toast.error('error while deleting post');
      return;
    }

    mutate(
      { post_id },
      {
        onSuccess: () => {
          queryCliennt.invalidateQueries(['profile']);
        },
        onSettled: () => setModalOpen(false),
      }
    );
  };

  return (
    <section aria-labelledby='user posts' className={styles.posts}>
      {posts.map((post) => {
        return (
          <figure key={post.id} className={styles.post}>
            <Image
              className={styles['post-img']}
              key={post.id}
              src={post.img}
              priority
              alt='post'
              width={240}
              height={500}
            />
            <figcaption>{post.description}</figcaption>

            {data.id === post.author_id && (
              <div className={styles.overlay}>
                <Button type='button' className={styles.delete} onClick={() => setModalOpen(true)}>
                  Delete post
                </Button>
                {modalOpen && (
                  <Modal
                    onCancel={() => setModalOpen(false)}
                    onAccept={() => handleDelete(post.id, post.img_uuid)}
                    cancelText='no'
                    acceptText='yes'
                  >
                    Are you sure?
                  </Modal>
                )}
              </div>
            )}
          </figure>
        );
      })}
    </section>
  );
};
