import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { apiClient } from '@/lib/apiClient';
import { updateToast } from '@/lib/updateToast';
import { usePostData } from '@/hooks/posts/usePostData';

import styles from './postEditModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { Modal } from '@/components/organisms/modal/Modal';

type PostEditModalProps = {
  setIsEditing: (isEditing: boolean) => void;
  postID: number;
};

type UpdateMutation = {
  description: string;
  location: string;
  postID: number;
};

const editPostSchema = z.object({
  description: z.string(),
  location: z.string(),
});

type EditValues = z.infer<typeof editPostSchema>;

export const PostEditModal = ({ setIsEditing, postID }: PostEditModalProps) => {
  const queryClient = useQueryClient();

  const { data } = usePostData(postID);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditValues>({
    mode: 'onBlur',
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      description: data?.post.description ?? '',
      location: data?.post.location ?? '',
    },
  });

  const watchFields = watch();

  const { mutate } = useMutation(async ({ description, location, postID }: UpdateMutation) => {
    return apiClient.post('/posts/post', {
      type: 'UPDATE',
      description,
      location,
      postID,
    });
  });

  const onSubmit: SubmitHandler<EditValues> = ({ description, location }) => {
    const updatingToast = toast.loading('Updating your post');
    mutate(
      { description, location, postID },
      {
        onSuccess: () => {
          updateToast({ toastId: updatingToast, text: 'Success', type: 'success' });
          setIsEditing(false);
        },
        onError: () => {
          updateToast({ toastId: updatingToast, text: 'Error', type: 'error' });
        },
        onSettled: () => {
          queryClient.invalidateQueries(['post', postID]);
          queryClient.invalidateQueries(['homepage posts']);
        },
      }
    );
  };

  return (
    <Modal key='editing' variant='big' setIsOpen={setIsEditing}>
      <h3 className={styles.heading}>Edit your post</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='description'
          isDirty={watchFields.description !== ''}
          error={errors.description}
          {...register('description')}
        />
        <Input
          type='text'
          label='location'
          isDirty={watchFields.location !== ''}
          error={errors.location}
          {...register('location')}
        />
        <div className={styles.editButtons}>
          <Button type='button' variant='red' onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button type='submit' variant='gradient'>
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};
