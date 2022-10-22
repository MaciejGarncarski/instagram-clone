import { useSessionContext } from '@supabase/auth-helpers-react';
import { useAtom } from 'jotai';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { centerAspectCrop } from '@/lib/centerAspect';
import { updateToast } from '@/lib/updateToast';
import { useAddPost } from '@/hooks/posts/useAddPost';

import { postValues } from '@/components/pages/newPost/NewPost';

import { aspectAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

export const useNewPost = () => {
  const [img, setImg] = useState<File | null>(null);
  const { supabaseClient } = useSessionContext();
  const { mutate } = useAddPost();

  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [aspect] = useAtom(aspectAtom);
  const [newImg] = useAtom(newImgAtom);

  const handleImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    if (!ev.target.files[0]) {
      return;
    }

    const src = URL.createObjectURL(ev.target.files[0]);
    setImgSrc(src);
    setImg(ev.target.files[0]);
  };

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
      toast.update(addingPost, {
        render: 'Couldnt upload image',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
        type: 'error',
      });
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
        },
      }
    );
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  return { onSubmit, handleImg, onImageLoad };
};
