import { useSessionContext } from '@supabase/auth-helpers-react';
import { useAtom } from 'jotai';
import { RefObject, useCallback, useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Id, toast } from 'react-toastify';
import { v4 } from 'uuid';

import { updateToast } from '@/lib/updateToast';
import { useAddPost } from '@/hooks/posts/useAddPost';

import { postValues } from '@/components/pages/newPost/NewPost';

import { completedCropAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

export const useSubmitPost = (buttonRef: RefObject<HTMLButtonElement>) => {
  const { supabaseClient } = useSessionContext();
  const { mutate } = useAddPost();

  const toastId = useRef<Id | null>(null);

  const [, setCompletedCrop] = useAtom(completedCropAtom);
  const [, setNewImg] = useAtom(newImgAtom);
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [newImg] = useAtom(newImgAtom);

  const notify = useCallback(() => {
    toastId.current = toast.loading('Uploading new post...');
  }, []);

  const onSubmit: SubmitHandler<postValues> = async ({ description, location }) => {
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

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }

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
        text: 'Couldnt get image, try again later',
        type: 'error',
      });
    }

    mutate(
      { description, publicUrl, uuid, location },
      {
        onSuccess: () => {
          setImgSrc('');
          setCrop(undefined);
          setNewImg(null);
          setCompletedCrop(null);
          if (!toastId.current) {
            return;
          }
          updateToast({ toastId: toastId.current, text: 'Uploaded!', type: 'success' });
        },
      }
    );
  };

  return { onSubmit };
};
