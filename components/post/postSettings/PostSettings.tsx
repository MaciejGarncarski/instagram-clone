import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import styles from './postSettings.module.scss';

type PostSettingsProps = {
  author_id: string;
  id: number;
  img_uuid: string;
};

import { BsThreeDots } from 'react-icons/bs';

export const PostSettings = ({ author_id, id, img_uuid }: PostSettingsProps) => {
  // const [modalOpen, setModalOpen] = useAtom(postModalAtom);
  // const { handleDelete } = useDeletePost();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const isAuthor = user?.id === author_id;

  return (
    <>
      <aside className={styles.container}>
        {isAuthor && (
          <div>
            <button
              type='button'
              className={styles.button}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className='sr-only'>settings</span>
              <BsThreeDots />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
