import { zodResolver } from '@hookform/resolvers/zod';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRegister } from '@/hooks/profile/useRegister';
import { registerSchema, RegisterValues } from '@/utils/registerValidation';

import { FormButton } from '@/components/atoms/form/formButton/FormButton';
import { FormContainer } from '@/components/atoms/form/formContainer/FormContainer';
import { FormHeading } from '@/components/atoms/form/formHeading/FormHeading';

import { AuthRedirect } from '../../atoms/authRedirect/AuthRedirect';
import { Input } from '../../atoms/input/Input';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegisterValues>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const { mutate } = useRegister();

  const onSubmit: SubmitHandler<RegisterValues> = async ({
    email,
    password,
    fullName,
    username,
  }) => {
    const { user, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
    }

    if (user) {
      mutate(
        { id: user.id, fullName, username },
        {
          onSuccess: () => {
            toast.success('Registered!'), router.replace(`/${username}`);
          },
        }
      );
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeading text='Register' />

      <Input
        type='email'
        label='email'
        isDirty={dirtyFields.email}
        error={errors.email}
        {...register('email')}
      />
      <Input
        type='text'
        label='full name'
        isDirty={dirtyFields.fullName}
        error={errors.fullName}
        {...register('fullName')}
      />
      <Input
        type='text'
        label='username'
        isDirty={dirtyFields.username}
        error={errors.username}
        {...register('username')}
      />
      <Input
        type='password'
        label='password'
        isDirty={dirtyFields.password}
        error={errors.password}
        {...register('password')}
      />

      <FormButton text='register' />
      <AuthRedirect type='register' />
    </FormContainer>
  );
};
