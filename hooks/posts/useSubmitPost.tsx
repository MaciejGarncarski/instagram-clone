import { useSessionContext } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Id, toast } from 'react-toastify';
import { v4 } from 'uuid';

import { updateToast } from '@/lib/updateToast';
import { useAddPost } from '@/hooks/posts/useAddPost';

import { createPostModalAtom } from '@/components/layout/nav/Nav';
import { NewPostValues } from '@/components/organisms/createPostModal/CreatePostModal';

import { completedCropAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

export const useSubmitPost = () => {
  const { supabaseClient } = useSessionContext();
  const { mutate, isLoading, isIdle } = useAddPost();
  const [, setIsAddPostOpen] = useAtom(createPostModalAtom);
  const queryClient = useQueryClient();
  const toastId = useRef<Id | null>(null);

  const [, setCompletedCrop] = useAtom(completedCropAtom);
  const [, setNewImg] = useAtom(newImgAtom);
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [newImg] = useAtom(newImgAtom);

  const notify = useCallback(() => {
    toastId.current = toast.loading('Uploading new post...');
  }, []);

  const onSubmit: SubmitHandler<NewPostValues> = async ({ description, location }) => {
    notify();
    const uuid = v4();

    if (!toastId.current || !newImg) {
      return;
    }

    const { data } = await supabaseClient.storage
      .from('post-images')
      .upload(`${uuid}/img.webp`, newImg, {
        cacheControl: '10800',
        upsert: false,
      });

    if (!data?.path) {
      updateToast({ toastId: toastId.current, text: 'Could not add post', type: 'error' });
      return;
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('post-images').getPublicUrl(data.path);

    if (!publicUrl) {
      updateToast({
        toastId: toastId.current,
        text: 'Something went wrong, try again later',
        type: 'error',
      });
    }

    if (isLoading) {
      return;
    }

    mutate(
      { description, publicUrl, uuid, location },
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
      }
    );
  };

  return { onSubmit, isLoading, isIdle };
};
