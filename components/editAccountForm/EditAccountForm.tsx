import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { bio, username, website } from '@/utils/editAccountValidation';

import styles from './editAccountForm.module.scss';

import { AvatarContainer } from './avatarContainer/AvatarContainer';
import { Buttons } from './buttons/Buttons';
import { Inputs } from './inputs/Inputs';
import { Loader } from '../loader/Loader';

const formSchema = z.object({
  username: username,
  bio: bio,
  website: website,
});

export type EditValues = z.infer<typeof formSchema>;

export const EditAccountForm = () => {
  const [mutationError, setMutationError] = useState<string | undefined>(undefined);
  const { data: userData } = useProfile();

  const userName = isString(userData?.username);
  const userWebsite = isString(userData?.website);
  const userBio = isString(userData?.bio);

  const userID = isString(userData?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<EditValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userName,
      website: userWebsite,
      bio: userBio,
    },
  });

  const { isLoading, mutate } = useUpdateProfile();

  const onSubmit: SubmitHandler<EditValues> = async ({ username, bio, website }) => {
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
