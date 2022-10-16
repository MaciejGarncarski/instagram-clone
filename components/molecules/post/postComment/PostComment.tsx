import { useUser } from '@supabase/auth-helpers-react';
import { ChangeEvent, FormEventHandler, forwardRef, useState } from 'react';
import { toast } from 'react-toastify';

import { updateToast } from '@/lib/updateToast';
import { useAddComment } from '@/hooks/posts/useAddComment';

import styles from './postComment.module.scss';

import { Button } from '@/components/atoms/button/Button';

type PostCommentProps = {
  id: number;
};

export const PostComment = forwardRef<HTMLTextAreaElement, PostCommentProps>(({ id }, ref) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const { user } = useUser();
  const { mutate } = useAddComment();

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(ev.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const addingCommentToast = toast.loading('Adding post...');
    mutate(
      { id, text: textAreaValue },
      {
        onSuccess: () => {
          updateToast({ toastId: addingCommentToast, text: 'Comment Added!', type: 'success' });
        },
        onSettled: () => setTextAreaValue(''),
        onError: () => {
          updateToast({ toastId: addingCommentToast, text: 'Failed!', type: 'error' });
        },
      }
    );
  };

  if (!user?.id) {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        placeholder='Add a comment...'
        autoComplete='off'
        value={textAreaValue}
        ref={ref}
        onChange={handleChange}
        spellCheck='true'
      />
      <Button type='submit' disabled={textAreaValue.trim() === ''} className={styles.button}>
        Post
      </Button>
    </form>
  );
});