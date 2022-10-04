type PostModalButtonsProps = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDeleting: (isOpen: boolean) => void;
};

type ButtonData = {
  text: string;
  onClick?: () => void;
  variant?: 'red';
};

export const usePostModalButtons = ({ setIsDeleting, setIsOpen }: PostModalButtonsProps) => {
  const closeMenu = () => {
    setIsOpen(false);
  };

  const openDeleteModal = () => {
    setIsOpen(false);
    setIsDeleting(true);
  };

  const buttonData: Array<ButtonData> = [
    {
      text: 'remove',
      variant: 'red',
      onClick: openDeleteModal,
    },
    {
      text: 'edit',
    },
    {
      text: 'cancel',
      onClick: closeMenu,
    },
  ];

  return { buttonData };
};
