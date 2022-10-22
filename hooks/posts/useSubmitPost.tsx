import { useSessionContext } from '@supabase/auth-helpers-react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { updateToast } from '@/lib/updateToast';
import { useAddPost } from '@/hooks/posts/useAddPost';

import { postValues } from '@/components/pages/newPost/NewPost';

import { completedCropAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

export const useSubmitPost = () => {
  const [img] = useState<File | null>(null);
  const { supabaseClient } = useSessionContext();
  const { mutate } = useAddPost();

  const [, setCompletedCrop] = useAtom(completedCropAtom);
  const [, setNewImg] = useAtom(newImgAtom);
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [newImg] = useAtom(newImgAtom);

  const onSubmit: SubmitHandler<postValues> = async ({ description, location }) => {
    const uuid = v4();
    const addingPost = toast.loading('Uploading new post...');

    if (!img) {
      return;
    }

    if (!newImg) {
      return;
    }

    const { error } = await supabaseClient.storage
      .from('post-images')
      .upload(`${uuid}/img.webp`, newImg, {
        upsert: false,
      });

    if (error) {
      updateToast({ toastId: addingPost, text: 'Could not add post', type: 'error' });
      return;
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('post-images').getPublicUrl(`${uuid}/img.webp`);

    if (!publicUrl) {
      updateToast({
        toastId: addingPost,
        text: 'Couldnt get image, try again later',
        type: 'error',
      });

      return;
    }

    mutate(
      { description, publicUrl, uuid, location },
      {
        onSuccess: () => {
          updateToast({ toastId: addingPost, text: 'Post added!', type: 'success' });
          setImgSrc('');
          setCrop(undefined);
          setNewImg(null);
          setCompletedCrop(null);
        },
      }
    );
  };

  return { onSubmit };
};