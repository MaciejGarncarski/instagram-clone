import styles from './error.module.scss';

type ErrorProps = {
  message: string;
};

export const Error = ({ message }: ErrorProps) => {
  return <p className={styles.error}>{message}</p>;
};
