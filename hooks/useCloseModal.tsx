import { MouseEvent, RefObject, useEffect } from 'react';

export const useCloseModal = (ref: RefObject<HTMLDivElement>, closeModal: () => void) => {
  const handleClickOutside = (clickEvent: MouseEvent) => {
    if (clickEvent.target === ref.current) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  return { handleClickOutside };
};
