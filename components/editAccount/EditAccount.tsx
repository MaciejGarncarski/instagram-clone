import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { bio, username, website } from '@/utils/editAccountValidation';

import styles from './editAccount.module.scss';

import { AvatarSection } from './avatarSection/AvatarSection';
import { Buttons } from './buttons/Buttons';
import { Inputs } from './inputs/Inputs';

const formSchema = z.object({
  username,
  bio,
  website,
});

export type FormValues = z.infer<typeof formSchema>;

export const EditAccount = () => {
  const { data } = useProfile();

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

  const { mutate } = useUpdateProfile();

  const onSubmit: SubmitHandler<FormValues> = async ({ username, bio, website }) => {
    mutate(
      { username, bio, website, userID },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error('Failed to update profile');
          }
          if (error instanceof TypeError) {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          toast.success('Updated!');
        },
      }
    );
  };

  return (
    <>
      <NextSeo title='Edit profile' />

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <AvatarSection />
        {data?.username === null && <h3 className={styles['no-username']}>Set your username!</h3>}
        <Inputs errors={errors} register={register} reset={reset} fieldsValues={watchFields} />
        <Buttons disabled={!isDirty || !isValid} reset={reset} />
      </form>
    </>
  );
};
