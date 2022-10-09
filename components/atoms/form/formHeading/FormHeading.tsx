import styles from './formHeading.module.scss';

type FormHeadingProps = {
  text: string;
};

export const FormHeading = ({ text }: FormHeadingProps) => {
  return <h1 className={styles.heading}>{text}</h1>;
};
