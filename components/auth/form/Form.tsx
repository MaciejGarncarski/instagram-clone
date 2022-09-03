import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './form.module.scss';

import { AuthRedirect } from './authRedirect/AuthRedirect';
import { Error } from '../../input/error/Error';
import { Input } from '../../input/Input';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .max(10, { message: 'Password is too long!' }),
});

export type FormValues = z.infer<typeof formSchema>;

type FormProps = {
  authError: ApiError | null;
  onSubmit: SubmitHandler<FormValues>;
  heading: 'register' | 'login';
};

export const Form = ({ authError, onSubmit, heading }: FormProps) => {
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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.heading}>{heading}</h1>

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
      {authError && <Error message={authError.message} />}
      <motion.button className={styles.button} type='submit' disabled={!isDirty || !isValid}>
        continue
      </motion.button>
      <AuthRedirect type={heading} />
    </form>
  );
};
