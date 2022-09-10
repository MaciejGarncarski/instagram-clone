import { NextSeo } from 'next-seo';

import styles from './newPost.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';

export const NewPost = () => {
  return (
    <>
      <NextSeo title='New post' />
      <form className={styles.form}>
        <UserAvatar />
        <label className={styles.img}>
          <input className='sr-only' type='file' />
        </label>
        <Button type='submit'>Add post!</Button>
      </form>
    </>
  );
};
