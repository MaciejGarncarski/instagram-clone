import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './inputs.module.scss';

import { Input } from '@/components/atoms/input/Input';

import { charCountAtom } from '@/store/store';

import { TextArea } from '../../atoms/input/TextArea';
import { FormValues } from '../../pages/editAccount/EditAccount';

type InputsProps<T extends FormValues> = {
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  reset: UseFormReset<T>;
  fieldsValues: T;
};

export const Inputs = ({ errors, register, fieldsValues }: InputsProps<FormValues>) => {
  const { data } = useProfile();
  const [, setCharCount] = useAtom(charCountAtom);

  const handleTextArea = (changeEv: ChangeEvent<HTMLTextAreaElement>) => {
    const value = changeEv.target.value;
    const valueChars = [...value];
    setCharCount(valueChars.length);
  };

  if (!data) {
    return null;
  }

  return (
    <div className={styles.inputs}>
      <Input
        type='text'
        label='Full name'
        isDirty={fieldsValues.fullName !== ''}
        error={errors.fullName}
        {...register('fullName')}
      />
      <Input
        type='text'
        label='username'
        isDirty={fieldsValues.username !== ''}
        error={errors.username}
        {...register('username')}
      />
      <TextArea
        label='bio'
        error={errors.bio}
        optional
        isDirty={fieldsValues.bio !== ''}
        {...register('bio', { onChange: handleTextArea })}
      />
    </div>
  );
};
