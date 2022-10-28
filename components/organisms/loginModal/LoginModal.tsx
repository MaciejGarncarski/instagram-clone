import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { loginSchema, LoginValues } from '@/utils/loginValidation';

import styles from './loginModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { Modal } from '@/components/organisms/modal/Modal';

type LoginModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export const LoginModal = ({ setIsOpen }: LoginModalProps) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const { supabaseClient } = useSessionContext();

  const closeModal = () => {
    setIsOpen(false);
  };

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

    await queryClient.invalidateQueries(['profile', { id: user?.id }]);
    setIsOpen(false);
    toast.success('Logged in!', { autoClose: 3500 });
  };

  return (
    <ModalContainer onClose={closeModal}>
      <div role='dialog' className={styles.modal}>
        <Modal.Heading>Login</Modal.Heading>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            label='email'
            isDirty={dirtyFields.email}
            error={errors.email}
          />
          <Input
            {...register('password')}
            label='password'
            type='password'
            isDirty={dirtyFields.password}
            error={errors.password}
          />
          <Button type='submit'>Log in</Button>
        </form>
      </div>
    </ModalContainer>
  );
};
