import styles from './formButton.module.scss';

import { Button } from '@/components/atoms/button/Button';

type FormButtonProps = {
  text: string;
};

export const FormButton = ({ text }: FormButtonProps) => {
  return (
    <Button className={styles.button} type='submit'>
      {text}
    </Button>
  );
};
