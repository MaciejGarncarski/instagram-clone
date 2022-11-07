import styles from './formButton.module.scss';

import { Button } from '@/components/atoms/button/Button';

type FormButtonProps = {
  text: string;
};

export const FormButton = ({ text }: FormButtonProps) => {
  return (
    <Button className={styles.button} variant='gradient' type='submit' data-testid='submit'>
      {text}
    </Button>
  );
};
