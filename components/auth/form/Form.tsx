import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './form.module.scss';

import { Error } from '../input/error/Error';
import { Input } from '../input/Input';

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).max(10),
});

export type FormValues = z.infer<typeof formSchema>;

type FormProps = {
  error: ApiError | null;
  onSubmit: SubmitHandler<FormValues>;
  heading: 'register' | 'login';
};

export const Form = ({ error, onSubmit, heading }: FormProps) => {
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
          Already fake instagram user? <br /> <Link href='/auth/login'>Login here. </Link>
        </p>
      );
    }
    return (
      <p>
        Not an fake instagram user? <br /> <Link href='/auth/register'>Register here. </Link>
      </p>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>{heading}</h1>

      <div className={styles.wrapper}>
        <Input
          type='email'
          label='email'
          isDirty={dirtyFields.email}
          error={errors.email}
          {...register('email')}
        />
        <Input
          type='password'
          label='password'
          isDirty={dirtyFields.password}
          error={errors.password}
          {...register('password')}
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
