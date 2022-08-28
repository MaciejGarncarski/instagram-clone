import { ChangeEvent, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';

import { isString } from '@/lib/isString';
import { useProfile } from '@/hooks/useProfile';

import styles from './inputs.module.scss';

import { Loader } from '@/components/loader/Loader';

import { EditInput } from './editInput/EditInput';
import { TextArea } from './editInput/TextArea';
import { EditValues } from '../EditAccountForm';

type InputsProps = {
  errors: FieldErrors<EditValues>;
  register: UseFormRegister<EditValues>;
  reset: UseFormReset<EditValues>;
};

export const Inputs = ({ errors, register, reset }: InputsProps) => {
  const { data } = useProfile();
  const [charCount, setCharCount] = useState(data?.bio?.length ?? 0);

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
  }, [data, reset]);

  if (data) {
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
          charCount={charCount}
          optional
          {...register('bio', { onChange: handleTextArea })}
        />
      </div>
    );
  }

  return <Loader />;
};
