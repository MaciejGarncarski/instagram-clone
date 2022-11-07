import styles from './formContainer.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

type FormContainerProps = {
  onSubmit: () => void;
} & Children;

export const FormContainer = ({ children, onSubmit }: FormContainerProps) => {
  return (
    <main id='main'>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </main>
  );
};
