import styles from './modalText.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

export const ModalText = ({ children }: Children) => {
  return <p className={styles.text}>{children}</p>;
};
