import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './editAccount.module.scss';

import { useProfile } from '@/hooks/useProfile';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';

import { Buttons } from './buttons/Buttons';
import { Inputs } from './inputs/Inputs';
import { Heading } from '../heading/Heading';

const formSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  bio: z.string().max(200, { message: 'Your bio is too long! Max characters: 200' }),
  website: z.string().min(6, { message: 'Password must be 6 or more characters long' }).max(20),
});

export type EditValues = z.infer<typeof formSchema>;

export const EditAccount = () => {
  const { data, error } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<EditValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email ?? '',
      username: data?.username ?? '',
      website: data?.website ?? '',
      bio: data?.website ?? '',
    },
  });

  const onSubmit = () => {
    console.log(dirtyFields);
  };

  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <NextSeo title='Edit profile' />

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className={styles['avatar-container']}>
          <UserAvatar className={styles.avatar} />
          <div className={styles['avatar-change']}>
            {data?.username && <Heading size='h2'>{data.username}</Heading>}
            <button type='button' className={styles['avatar-button']}>
              change your avatar!
            </button>
          </div>
        </div>
        <Inputs errors={errors} register={register} />
        <Buttons isValid={isValid} />
      </form>
    </>
  );
};
