import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Id, toast } from 'react-toastify';

import { updateToast } from '@/lib/updateToast';
import { useAddPost } from '@/hooks/posts/useAddPost';

import { createPostModalAtom } from '@/components/layout/nav/Nav';
import { NewPostValues } from '@/components/organisms/createPostModal/CreatePostModal';

import { completedCropAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

export const useSubmitPost = () => {
  const { mutate, isLoading, isIdle } = useAddPost();
  const [, setIsAddPostOpen] = useAtom(createPostModalAtom);
  const queryClient = useQueryClient();
  const toastId = useRef<Id | null>(null);

  const [, setCompletedCrop] = useAtom(completedCropAtom);
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [newImg, setNewImg] = useAtom(newImgAtom);

  const notify = useCallback(() => {
    toastId.current = toast.loading('Uploading new post...');
  }, []);

  const onSubmit: SubmitHandler<NewPostValues> = async ({ description, location }) => {
    notify();

    if (!toastId.current || !newImg) {
      return;
    }

    if (isLoading) {
      return;
    }

    mutate(
      { imageFile: newImg, description, location },
      {
        onSuccess: () => {
          setImgSrc('');
          setCrop(undefined);
          setNewImg(null);
          setCompletedCrop(null);
          setIsAddPostOpen(false);
          if (!toastId.current) {
            return;
          }
          updateToast({ toastId: toastId.current, text: 'Uploaded!', type: 'success' });
          queryClient.invalidateQueries(['homepage posts']);
        },
        onError: () => {
          if (!toastId.current) {
            return;
          }
          updateToast({
            toastId: toastId.current,
            text: 'Could not upload new post',
            type: 'error',
          });
        },
      }
    );
  };

  return { onSubmit, isLoading, isIdle };
};
