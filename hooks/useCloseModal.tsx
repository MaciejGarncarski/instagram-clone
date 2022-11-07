import { MouseEvent, RefObject, useEffect } from 'react';

type UseCloseModal = {
  ref: RefObject<HTMLDivElement>;
  onClose: () => void;
};

export const useCloseModal = ({ ref, onClose }: UseCloseModal) => {
  const handleClickOutside = (clickEvent: MouseEvent) => {
    if (clickEvent.target === ref.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return { handleClickOutside };
};
