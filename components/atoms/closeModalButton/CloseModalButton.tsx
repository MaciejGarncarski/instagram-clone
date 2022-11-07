import styles from './closeModalButton.module.scss';

import { CancelIcon } from '@/components/atoms/icons/CancelIcon';

type CloseModalButtonProps = {
  handleClose: () => void;
};

export const CloseModalButton = ({ handleClose }: CloseModalButtonProps) => {
  return (
    <button type='button' className={styles.button} onClick={handleClose}>
      <CancelIcon />
    </button>
  );
};
