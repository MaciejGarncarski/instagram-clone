import clsx from 'clsx';
import Link from 'next/link';

import styles from './modalLink.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

export type ModalItemPosition = {
  isFirst?: boolean;
  isLast?: boolean;
};

type LinkProps = {
  href: string;
} & Children &
  ModalItemPosition;

export const ModalLink = ({ children, href, isFirst, isLast }: LinkProps) => {
  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          isFirst && styles['link--first'],
          isLast && styles['link--last'],
          styles.link
        )}
      >
        {children}
      </a>
    </Link>
  );
};
