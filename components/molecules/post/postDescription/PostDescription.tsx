import { useState } from 'react';

import { usePostData } from '@/hooks/posts/usePostData';

import styles from './postDescription.module.scss';

type PostDescriptionProps = {
  id: number;
  showAll?: boolean;
};

export const PostDescription = ({ id, showAll }: PostDescriptionProps) => {
  const [isLess, setIsLess] = useState<boolean>(true);
  const { data: postData } = usePostData(id);

  if (!postData) {
    return null;
  }

  const { description, author } = postData;

  const LESS_DESCRIPTION_LENGTH = 50;

  const lessDescription = description.slice(0, LESS_DESCRIPTION_LENGTH) + '...';

  const handleClick = () => setIsLess((prev) => !prev);

  const isDescriptonSmall = description.length > LESS_DESCRIPTION_LENGTH;

  return (
    <div>
      <span className={styles.bold}>{author?.username ?? `user-${author.profile_id}`}</span>{' '}
      {showAll ? (
        <p className={styles.description}>{description}&nbsp;</p>
      ) : (
        <>
          {isDescriptonSmall ? (
            <p className={styles.description}>{isLess ? lessDescription : description}&nbsp;</p>
          ) : (
            <p className={styles.description}>{description}</p>
          )}
          {isDescriptonSmall && (
            <button className={styles.button} type='button' onClick={handleClick}>
              {isLess ? 'more' : 'less'}
            </button>
          )}
        </>
      )}
    </div>
  );
};
