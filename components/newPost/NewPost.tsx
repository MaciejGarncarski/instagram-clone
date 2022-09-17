import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useState } from 'react';

import styles from './newPost.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';

export const NewPost = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    const src = URL.createObjectURL(ev.target.files[0]);
    setPreview(src);
  };

  return (
    <>
      <NextSeo title='New post' />
      <form className={styles.form}>
        <UserAvatar />
        <label className={styles.label}>
          {preview && (
            <Image
              width={320}
              height={300}
              className={styles.preview}
              src={preview}
              alt='post preview'
            />
          )}
          <input className='sr-only' type='file' onChange={handleImg} />
        </label>
        <Button type='submit'>Add post!</Button>
      </form>
    </>
  );
};
