import styles from './terms.module.scss';

import { GoBackButton } from '@/components/atoms/goBackButton/GoBackButton';

const terms = [
  'You accept cookies stored in browser',
  'Your posts and profile pictures are stored in database',
];

export const Terms = () => {
  return (
    <>
      <GoBackButton />
      <h2>Terms of use</h2>
      <ol className={styles.list}>
        {terms.map((term) => {
          return <li key={term}>{term}.</li>;
        })}
      </ol>
    </>
  );
};
