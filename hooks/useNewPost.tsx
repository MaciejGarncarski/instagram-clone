import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { useAddPost } from '@/hooks/useAddPost';

import { postValues } from '@/components/newPost/NewPost';

import { newPostPreviewAtom } from '@/store/store';

export const useNewPost = () => {
  const [img, setImg] = useState<File | null>(null);
  const [, setPreview] = useAtom(newPostPreviewAtom);
  const { mutate } = useAddPost();

  const handleImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    if (!ev.target.files[0]) {
      return;
    }

    const src = URL.createObjectURL(ev.target.files[0]);
    setPreview(src);
    setImg(ev.target.files[0]);
  };

  const onSubmit: SubmitHandler<postValues> = async ({ description }) => {
    const uuid = v4();

    if (!img) {
      return;
    }

    const { error } = await supabaseClient.storage
      .from('post-images')
      .upload(`${uuid}/img.jpg`, img, {
        cacheControl: '10080',
        upsert: false,
      });

    if (error) {
      toast.error('Couldnt upload image');
      return;
    }

    const { publicURL: imgURL, error: imgError } = supabaseClient.storage
      .from('post-images')
      .getPublicUrl(`${uuid}/img.jpg`);

    if (!imgURL || imgError) {
      toast.error('Couldnt get image');
      return;
    }

    mutate({ description, imgURL });
  };

  return { onSubmit, handleImg };
};
