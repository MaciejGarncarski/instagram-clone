import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useNewPost } from '@/hooks/posts/useNewPost';
import { useProfile } from '@/hooks/profile/useProfile';
import { IMG_EXTENSIONS_DOTS } from '@/hooks/useAvatarInput';

import styles from './newPost.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';

import { newPostPreviewAtom } from '@/store/store';

import addImg from '~/images/add.svg';

const newPostSchema = z.object({
  description: z.string().min(3),
});

export type postValues = z.infer<typeof newPostSchema>;

export const NewPost = () => {
  const [preview, setPreview] = useAtom(newPostPreviewAtom);
  const { data } = useProfile();

  setPreview(null);

  const { handleImg, onSubmit } = useNewPost();

  const acceptedExtensions = IMG_EXTENSIONS_DOTS.join(',');

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<postValues>({
    mode: 'onBlur',
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      description: '',
    },
  });

  return (
    <main id='main'>
      <NextSeo title='New post' />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <UserAvatar className={styles.img} />
          {data?.username && <h2>{data.username}</h2>}
        </div>

        <input
          className={clsx('sr-only', styles.input)}
          type='file'
          accept={acceptedExtensions}
          onChange={handleImg}
          id='file'
          name='new post'
        />
        <label className={styles.label} htmlFor='file'>
          {preview ? (
            <Image
              width={320}
              height={300}
              className={styles.preview}
              src={preview}
              alt='post preview'
            />
          ) : (
            <Image
              src={addImg}
              width={70}
              height={70}
              className={styles.placeholder}
              alt='add photo'
            />
          )}
        </label>
        <Input
          type='text'
          label='Post description'
          isDirty={dirtyFields.description}
          error={errors.description}
          {...register('description')}
        />
        <Button type='submit' disabled={Boolean(!preview)}>
          Add post!
        </Button>
      </form>
    </main>
  );
};
