import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import styles from './form.module.scss';

import { Button } from '@/components/common/button/Button';

import { AuthRedirect } from './authRedirect/AuthRedirect';
import { Input } from '../../common/input/Input';

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
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (authError) {
      toast.error(authError.message);
    }
  }, [authError]);

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
      <Button className={styles.button} type='submit'>
        continue
      </Button>
      <AuthRedirect type={heading} />
    </form>
  );
};
