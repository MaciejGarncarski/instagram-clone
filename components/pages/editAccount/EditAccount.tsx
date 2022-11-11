import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/profile/useProfile';
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import { bio } from '@/utils/editAccountValidation';
import { fullName, username } from '@/utils/registerValidation';

import styles from './editAccount.module.scss';

import { GoBackButton } from '@/components/atoms/goBackButton/GoBackButton';
import { Buttons } from '@/components/molecules/account/editAccount/buttons/Buttons';
import { AvatarSection } from '@/components/molecules/avatarSection/AvatarSection';

import { Inputs } from '../../molecules/inputs/Inputs';

const formSchema = z.object({
  fullName,
  username,
  bio,
});

export type FormValues = z.infer<typeof formSchema>;

export const EditAccount = () => {
  const { data } = useProfile();

  const fullName = isString(data?.full_name);
  const username = isString(data?.username);
  const userBio = isString(data?.bio);

  const userID = isString(data?.id);
  const profileID = data?.profile_id ?? 0;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName,
      username,
      bio: userBio,
    },
  });

  const watchFields = watch();
  const queryClient = useQueryClient();
  const { mutate } = useUpdateProfile();

  const onSubmit: SubmitHandler<FormValues> = ({ fullName, username, bio }) => {
    const updatingToast = toast.loading('Updating profile...');

    mutate(
      { fullName, username, bio, userID, profileID },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error('Failed to update profile');
          }
          if (error instanceof TypeError) {
            toast.error(error.message);
          }
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries(['profile']);

          toast.update(updatingToast, {
            render: 'Updated!',
            type: 'success',
            autoClose: 4000,
            isLoading: false,
          });
        },
      }
    );
  };

  return (
    <>
      <NextSeo title='Edit Profile • Delaygram' />
      <GoBackButton />
      <form
        className={styles.container}
        id='main'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <AvatarSection />
        <Inputs errors={errors} register={register} reset={reset} fieldsValues={watchFields} />
        <Buttons disabled={!isDirty || !isValid} isDirty={isDirty} reset={reset} />
      </form>
    </>
  );
};
