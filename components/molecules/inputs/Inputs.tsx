import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
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

export const Inputs = ({ errors, register, reset, fieldsValues }: InputsProps<FormValues>) => {
  const { data } = useProfile();
  const [, setCharCount] = useAtom(charCountAtom);

  const handleTextArea = (changeEv: ChangeEvent<HTMLTextAreaElement>) => {
    const value = changeEv.target.value;
    const valueChars = [...value];
    setCharCount(valueChars.length);
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setCharCount(data?.bio?.length ?? 0);
    reset({
      username: isString(data.username),
      website: isString(data.website),
      bio: isString(data.bio),
    });
  }, [data, reset, setCharCount]);

  return (
    <div className={styles.inputs}>
      <Input
        type='text'
        label='username'
        isDirty={fieldsValues.username !== ''}
        error={errors.username}
        {...register('username')}
      />
      <Input
        type='text'
        label='website'
        optional
        isDirty={fieldsValues.website !== ''}
        error={errors.website}
        {...register('website')}
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
