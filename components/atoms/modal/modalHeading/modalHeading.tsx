import styles from './modalHeading.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

export const modalHeading = ({ children }: Children) => {
  return <h3 className={styles.heading}>{children}</h3>;
};
