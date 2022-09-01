import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { isString } from '@/lib/isString';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useUser } from '@/hooks/useUser';
import { bio, username, website } from '@/utils/editAccountValidation';

import styles from './editAccount.module.scss';

import { AvatarSection } from './avatarSection/AvatarSection';
import { Buttons } from './buttons/Buttons';
import { Inputs } from './inputs/Inputs';
import { Loader } from '../loader/Loader';

const formSchema = z.object({
  username,
  bio,
  website,
});

export type FormValues = z.infer<typeof formSchema>;

export const EditAccount = () => {
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
    watch,
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

  const watchFields = watch();

  const { isLoading, mutate } = useUpdateProfile();

  const onSubmit: SubmitHandler<FormValues> = async ({ username, bio, website }) => {
    mutate(
      { username, bio, website, userID },
      {
        onSuccess: () => {
          setMutationError(undefined);
        },
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
        <div>
          <p>Updating your profile</p>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <NextSeo title='Edit profile' />

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <AvatarSection />
        {data?.username === null && <h3 className={styles['no-username']}>Set your username!</h3>}
        <Inputs errors={errors} register={register} reset={reset} fieldsValues={watchFields} />

        {mutationError && <p className={styles.error}>{mutationError}</p>}
        <Buttons disabled={!isDirty || !isValid} reset={reset} />
      </form>
    </>
  );
};
