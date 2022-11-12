import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSubmitPost } from '@/hooks/posts/useSubmitPost';

import styles from './newPostModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { CloseModalButton } from '@/components/atoms/modal/closeModalButton/CloseModalButton';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { NewPostImage } from '@/components/molecules/newPostImage/NewPostImage';

import { imgSrcAtom } from '@/store/store';

type NewPostModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const newPostSchema = z.object({
  description: z.string().min(3),
  location: z.string(),
});

export type NewPostValues = z.infer<typeof newPostSchema>;

export const NewPostModal = ({ setIsOpen }: NewPostModalProps) => {
  const [imgSrc] = useAtom(imgSrcAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { onSubmit, isLoading } = useSubmitPost();

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

  const isDisabled = (!dirtyFields.description && Boolean(imgSrc)) || isLoading;

  const submitNewPost: SubmitHandler<NewPostValues> = ({ description, location }) => {
    if (!buttonRef.current) {
      return;
    }
    onSubmit({ description, location });
    buttonRef.current.disabled = true;
  };

  return (
    <ModalContainer onClose={() => setIsOpen(false)}>
      <div className={styles.modal} role='dialog'>
        <CloseModalButton handleClose={() => setIsOpen(false)} />
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
      </div>
    </ModalContainer>
  );
};
