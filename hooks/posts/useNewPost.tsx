import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { useAddPost } from '@/hooks/posts/useAddPost';

import { postValues } from '@/components/pages/newPost/NewPost';

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

  const onSubmit: SubmitHandler<postValues> = async ({ description, location }) => {
    const uuid = v4();

    const addingPost = toast.loading('Uploading new post...');

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
      toast.update(addingPost, {
        render: 'Couldnt upload image',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
        type: 'error',
      });
      return;
    }

    const { publicURL: imgURL, error: imgError } = supabaseClient.storage
      .from('post-images')
      .getPublicUrl(`${uuid}/img.jpg`);

    if (!imgURL || imgError) {
      toast.update(addingPost, {
        render: 'Couldnt get image, try again later',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
        type: 'error',
      });
      return;
    }

    mutate(
      { description, imgURL, uuid, location },
      {
        onSuccess: () => {
          toast.update(addingPost, {
            render: 'Post added!',
            isLoading: false,
            autoClose: 4000,
            closeOnClick: true,
            type: 'success',
          });
          setPreview(null);
        },
      }
    );
  };

  return { onSubmit, handleImg };
};
