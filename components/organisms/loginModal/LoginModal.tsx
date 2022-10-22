import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import { useCloseModal } from '@/hooks/useCloseModal';
import { loginSchema, LoginValues } from '@/utils/loginValidation';

import styles from './loginModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
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
    unlockScroll();
  };

  const overlayRef = useRef<HTMLDivElement>(null);

  const { handleClickOutside } = useCloseModal(overlayRef, closeModal);
  lockScroll();

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
    toast.success('Logged in!');
  };

  return (
    <div ref={overlayRef} onClick={handleClickOutside} className={styles.overlay}>
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
    </div>
  );
};
