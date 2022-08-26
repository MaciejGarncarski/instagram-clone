import { FieldErrors, UseFormRegister } from 'react-hook-form';

import styles from './inputs.module.scss';

import { useProfile } from '@/hooks/useProfile';

import { EditValues } from '../EditAccount';
import { EditInput } from '../editInput/EditInput';
import { TextArea } from '../editInput/TextArea';

type InputsProps = {
  errors: FieldErrors<EditValues>;
  register: UseFormRegister<EditValues>;
};

export const Inputs = ({ errors, register }: InputsProps) => {
  const { data } = useProfile();

  return (
    <div className={styles.inputs}>
      <EditInput
        type='email'
        label='email'
        error={errors.email}
        {...register('email', { value: data?.email ?? '' })}
      />
      <EditInput
        type='text'
        label='website'
        error={errors.website}
        {...register('website', { value: data?.website ?? '' })}
      />
      <EditInput
        type='text'
        label='username'
        error={errors.username}
        {...register('username', { value: data?.username ?? '' })}
      />
      <TextArea label='bio' error={errors.bio} {...register('bio', { value: data?.bio ?? '' })} />
    </div>
  );
};
