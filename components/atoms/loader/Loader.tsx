import clsx from 'clsx';

import styles from './loader.module.scss';

type Variants = 'white' | 'small' | 'margins';

type LoaderProps = {
  className?: string;
  variant?: Variants | Array<Variants>;
};

export const Loader = ({ variant, className }: LoaderProps) => {
  const variantClassName = typeof variant === 'string' && styles[variant];

  const hasMultipleVariants = Array.isArray(variant);
  const variants = hasMultipleVariants ? variant.map((el) => styles[el]) : variantClassName;

  return <div className={clsx(styles.loader, variants, className)}>Loading...</div>;
};
