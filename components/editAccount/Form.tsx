import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { isString } from '@/lib/isString';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useUser } from '@/hooks/useUser';
import { bio, username, website } from '@/utils/editAccountValidation';

import styles from './form.module.scss';

import { AvatarContainer } from './avatarContainer/AvatarContainer';
import { Buttons } from './buttons/Buttons';
import { Inputs } from './inputs/Inputs';
import { Loader } from '../loader/Loader';

const formSchema = z.object({
  username,
  bio,
  website,
});

export type FormValues = z.infer<typeof formSchema>;

export const Form = () => {
  const [mutationError, setMutationError] = useState<string | undefined>(undefined);
  const { data } = useUser();
  const userName = isString(data?.username);
  const userWebsite = isString(data?.website);
  const userBio = isString(data?.bio);

  const userID = isString(data?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userName,
      website: userWebsite,
      bio: userBio,
    },
  });

  const { isLoading, mutate } = useUpdateProfile();

  const onSubmit: SubmitHandler<FormValues> = async ({ username, bio, website }) => {
    mutate(
      { username, bio, website, userID },
      {
        onSuccess: () => setMutationError(undefined),
        onError: (error) => {
          if (error instanceof TypeError) {
            setMutationError(error.message);
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <NextSeo title='Updating profile' />
        <Loader text='Updating your profile' />
      </>
    );
  }

  return (
    <>
      <NextSeo title='Edit profile' />

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <AvatarContainer />
        <Inputs errors={errors} register={register} reset={reset} />
        {mutationError && <p className={styles.error}>{mutationError}</p>}
        <Buttons disabled={!isDirty || !isValid} reset={reset} />
      </form>
    </>
  );
};
