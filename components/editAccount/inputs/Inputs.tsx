import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useUser } from '@/hooks/useUser';

import styles from './inputs.module.scss';

import { charCountAtom } from '@/store/store';

import { EditInput } from './editInput/EditInput';
import { TextArea } from './editInput/TextArea';
import { FormValues } from '../Form';

type InputsProps = {
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  reset: UseFormReset<FormValues>;
};

export const Inputs = ({ errors, register, reset }: InputsProps) => {
  const { data } = useUser();
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
      <EditInput type='text' label='username' error={errors.username} {...register('username')} />
      <EditInput
        type='text'
        label='website'
        optional
        error={errors.website}
        {...register('website')}
      />
      <TextArea
        label='bio'
        error={errors.bio}
        optional
        {...register('bio', { onChange: handleTextArea })}
      />
    </div>
  );
};
