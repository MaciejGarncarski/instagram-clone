import styles from './buttons.module.scss';

type ButtonsProps = {
  isValid: boolean;
};

export const Buttons = ({ isValid }: ButtonsProps) => {
  return (
    <div className={styles.buttons}>
      <button type='button' className={styles.cancel}>
        cancel
      </button>
      <button type='submit' className={styles.submit} disabled={isValid ? false : true}>
        confirm changes
      </button>
    </div>
  );
};
