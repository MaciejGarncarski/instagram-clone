import Link from 'next/link';

import styles from './modalLink.module.scss';

import { Children } from '@/components/organisms/modal/Modal';

type LinkProps = Children & {
  href: string;
};

export const ModalLink = ({ children, href }: LinkProps) => {
  return (
    <Link href={href} passHref>
      <a className={styles.link}>{children}</a>
    </Link>
  );
};
