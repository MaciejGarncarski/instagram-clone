import clsx from 'clsx';

import styles from './modalText.module.scss';

import { ModalItemPosition } from '@/components/atoms/modal/modalLink/ModalLink';
import { Children } from '@/components/organisms/modal/Modal';

type ModalTextProps = ModalItemPosition & Children;

export const ModalText = ({ children, isFirst, isLast }: ModalTextProps) => {
  return (
    <p
      className={clsx(
        isFirst && styles['text--first'],
        isLast && styles['text--last'],
        styles.text
      )}
    >
      {children}
    </p>
  );
};
