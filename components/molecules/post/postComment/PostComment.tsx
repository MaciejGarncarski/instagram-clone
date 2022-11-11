import { useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { ChangeEvent, FormEventHandler, forwardRef, useState } from 'react';
import { toast } from 'react-toastify';

import { updateToast } from '@/lib/updateToast';
import { useAddComment } from '@/hooks/posts/useAddComment';

import styles from './postComment.module.scss';

import { Button } from '@/components/atoms/button/Button';

type PostCommentProps = {
  id: number;
  className?: string;
};

export const PostComment = forwardRef<HTMLTextAreaElement, PostCommentProps>(
  ({ className, id }, ref) => {
    const queryClient = useQueryClient();
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const user = useUser();
    const { mutate } = useAddComment();

    const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
      setTextAreaValue(ev.target.value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
      ev.preventDefault();
      const addingCommentToast = toast.loading('Adding comment...');
      mutate(
        { id, text: textAreaValue },
        {
          onSuccess: () => {
            updateToast({ toastId: addingCommentToast, text: 'Comment Added!', type: 'success' });
          },
          onError: () => {
            updateToast({ toastId: addingCommentToast, text: 'Failed!', type: 'error' });
          },
          onSettled: () => {
            setTextAreaValue('');
            queryClient.invalidateQueries(['comments', id]);
          },
        }
      );
    };

    if (!user?.id) {
      return null;
    }

    return (
      <form className={clsx(className, styles.form)} onSubmit={handleSubmit}>
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
          post
        </Button>
      </form>
    );
  }
);
