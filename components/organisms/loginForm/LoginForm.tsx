import { zodResolver } from '@hookform/resolvers/zod';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { loginSchema, LoginValues } from '@/utils/loginValidation';

import { FormButton } from '@/components/atoms/form/formButton/FormButton';
import { FormContainer } from '@/components/atoms/form/formContainer/FormContainer';
import { FormHeading } from '@/components/atoms/form/formHeading/FormHeading';

import { AuthRedirect } from '../../atoms/authRedirect/AuthRedirect';
import { Input } from '../../atoms/input/Input';

export const LoginForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginValues>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries(['profile', { id: user?.id }]);
    toast.success('Logged in!');
    router.replace('/profile/me');
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeading text='Login' />

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

      <FormButton text='Log in' />
      <AuthRedirect type='login' />
    </FormContainer>
  );
};
