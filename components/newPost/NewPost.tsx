import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { IMG_EXTENSIONS_DOTS } from '@/hooks/useAvatarInput';
import { useNewPost } from '@/hooks/useNewPost';
import { useProfile } from '@/hooks/useProfile';

import styles from './newPost.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';

import { newPostPreviewAtom } from '@/store/store';

import addImg from '~/images/add.svg';

const newPostSchema = z.object({
  description: z.string().min(5),
});

export type postValues = z.infer<typeof newPostSchema>;

export const NewPost = () => {
  const [preview] = useAtom(newPostPreviewAtom);
  const { data } = useProfile();

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
    <>
      <NextSeo title='New post' />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <UserAvatar className={styles.img} />
          {data?.username && <h2>{data.username}</h2>}
        </div>

        <label className={styles.label}>
          <input
            className={clsx('sr-only', styles.input)}
            type='file'
            accept={acceptedExtensions}
            onChange={handleImg}
          />
          {preview ? (
            <Image
              width={320}
              height={300}
              className={styles.preview}
              src={preview}
              alt='post preview'
            />
          ) : (
            <Image src={addImg} width={70} height={70} alt='add photo' />
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
    </>
  );
};
