import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './authForm.module.scss';

import { Heading } from '@/components/heading/Heading';

import { Error } from '../error/Error';
import { Input } from '../input/Input';

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).max(10),
});

export type FormValues = z.infer<typeof formSchema>;

type AuthFormProps = {
  error: ApiError | null;
  onSubmit: SubmitHandler<FormValues>;
  heading: 'register' | 'login';
};

export const AuthForm = ({ error, onSubmit, heading }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const RedirectLink = () => {
    if (heading === 'register') {
      return (
        <p>
          Already gram-gram user? <br /> <Link href='/login'>Login here. </Link>
        </p>
      );
    }
    return (
      <p>
        Not an gram-gram user? <br /> <Link href='/register'>Register here. </Link>
      </p>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Heading size='h1' className={styles.heading}>
        {heading}
      </Heading>

      <div className={styles.wrapper}>
        <Input
          type='email'
          label='email'
          register={register}
          isDirty={dirtyFields.email}
          error={errors.email}
        />
        <Input
          type='password'
          label='password'
          register={register}
          isDirty={dirtyFields.password}
          error={errors.password}
        />
        {error && <Error message={error.message} />}
      </div>
      <motion.button className={styles.button} type='submit' disabled={!isDirty || !isValid}>
        continue
      </motion.button>
      <RedirectLink />
      <div className={styles.or}>
        <hr />
        or
      </div>
    </form>
  );
};
