import Image from 'next/future/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

import styles from './item.module.scss';

type ItemProps = {
  to: string;
  text: string;
  icon: StaticImageData;
};

export const Item = ({ to, text, icon }: ItemProps) => {
  return (
    <li className={styles.item} title={text}>
      <Link href={to} passHref>
        <a className={styles.link}>
          <Image src={icon} alt={text} />
        </a>
      </Link>
    </li>
  );
};
