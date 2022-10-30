import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useProfile } from '@/hooks/profile/useProfile';
import { loginSchema, LoginValues } from '@/utils/loginValidation';

import { FormButton } from '@/components/atoms/form/formButton/FormButton';
import { FormContainer } from '@/components/atoms/form/formContainer/FormContainer';
import { FormHeading } from '@/components/atoms/form/formHeading/FormHeading';

import { AuthRedirect } from '../../atoms/authRedirect/AuthRedirect';
import { Input } from '../../atoms/input/Input';

export const LoginForm = () => {
  const { supabaseClient } = useSessionContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useProfile();

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
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries(['profile', { id: data?.id }]);
    toast.success('Logged in!');
    router.replace('/');
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeading text='Log in' />
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
