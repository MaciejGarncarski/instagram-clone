import styles from './label.module.scss';

type LabelProps = {
  label: string;
  optional?: boolean;
};

export const Label = ({ label, optional }: LabelProps) => {
  return (
    <label htmlFor={label} className={styles.label}>
      {label}
      {optional && <p className={styles.optional}>(optional)</p>}
    </label>
  );
};
