import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { loginSchema, LoginValues } from '@/utils/loginValidation';

import styles from './loginModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { CloseModalButton } from '@/components/atoms/modal/closeModalButton/CloseModalButton';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';

type LoginModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export const modalVariant: Variants = {
  hidden: {
    opacity: 0.5,
    y: -70,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
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
    <ModalContainer onClose={closeModal} variant='center'>
      <motion.div
        variants={modalVariant}
        initial='hidden'
        animate='visible'
        role='dialog'
        className={styles.modal}
      >
        <h3 className={styles.heading}>Log in</h3>
        <CloseModalButton handleClose={closeModal} />
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
          <Button type='submit' className={styles.button}>
            Log in
          </Button>
        </form>
      </motion.div>
    </ModalContainer>
  );
};
