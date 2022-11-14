import { zodResolver } from '@hookform/resolvers/zod';
import { motion, Variants } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSubmitPost } from '@/hooks/posts/useSubmitPost';

import styles from './createPostModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { CloseModalButton } from '@/components/atoms/modal/closeModalButton/CloseModalButton';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { createPostModalAtom } from '@/components/layout/nav/Nav';
import { NewPostImage } from '@/components/molecules/newPostImage/NewPostImage';

import { imgSrcAtom } from '@/store/store';

const newPostSchema = z.object({
  description: z.string().min(3),
  location: z.string(),
});

export type NewPostValues = z.infer<typeof newPostSchema>;

const containerVariants: Variants = {
  hidden: {
    opacity: 0.6,
    y: -70,
  },
  open: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.6,
  },
};

export const CreatePostModal = () => {
  const [imgSrc] = useAtom(imgSrcAtom);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [, setIsAddPostOpen] = useAtom(createPostModalAtom);
  const { onSubmit, isLoading } = useSubmitPost();

  const closeModal = () => {
    setIsAddPostOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<NewPostValues>({
    mode: 'onBlur',
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      description: '',
    },
  });

  const submitNewPost: SubmitHandler<NewPostValues> = ({ description, location }) => {
    if (!buttonRef.current) {
      return;
    }
    onSubmit({ description, location });
    buttonRef.current.disabled = true;
  };

  const isDisabled = (!dirtyFields.description && Boolean(imgSrc)) || isLoading;

  return (
    <ModalContainer onClose={closeModal}>
      <motion.div
        className={styles.modal}
        role='dialog'
        variants={containerVariants}
        initial='hidden'
        exit='exit'
        animate='open'
      >
        <CloseModalButton handleClose={closeModal} />
        <h2 className={styles.heading}>Create new post</h2>
        <form className={styles.form} onSubmit={handleSubmit(submitNewPost)}>
          <NewPostImage />
          <div className={styles.inputs}>
            <Input
              type='text'
              label='Post description'
              isDirty={dirtyFields.description}
              error={errors.description}
              {...register('description')}
            />
            <Input
              type='text'
              label='location'
              optional
              isDirty={dirtyFields.location}
              error={errors.location}
              {...register('location')}
            />
          </div>
          <Button
            type='submit'
            className={styles.button}
            variant='gradient'
            ref={buttonRef}
            disabled={isDisabled}
          >
            Add post!
          </Button>
        </form>
      </motion.div>
    </ModalContainer>
  );
};
