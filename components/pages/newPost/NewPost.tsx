import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@supabase/auth-helpers-react';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSubmitPost } from '@/hooks/posts/useSubmitPost';
import { useProfile } from '@/hooks/profile/useProfile';

import styles from './newPost.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { NewPostImage } from '@/components/molecules/newPostImage/NewPostImage';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

import { imgSrcAtom } from '@/store/store';

const newPostSchema = z.object({
  description: z.string().min(3),
  location: z.string(),
});

export type postValues = z.infer<typeof newPostSchema>;

export const NewPost = () => {
  const { data } = useProfile();
  const user = useUser();
  const [imgSrc] = useAtom(imgSrcAtom);
  const { onSubmit } = useSubmitPost();

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
      <NextSeo title='Create Post • Delaygram' />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <UserAvatar userID={user?.id ?? ''} className={styles.img} />
          {data?.username && <h2>{data.username}</h2>}
        </div>
        <NewPostImage />
        <Input
          type='text'
          label='Post description'
          isDirty={dirtyFields.description}
          error={errors.description}
          {...register('description')}
        />
        <Input
          type='text'
          label='location'
          optional
          isDirty={dirtyFields.location}
          error={errors.location}
          {...register('location')}
        />
        <Button type='submit' disabled={Boolean(!imgSrc)}>
          Add post!
        </Button>
      </form>
    </main>
  );
};
