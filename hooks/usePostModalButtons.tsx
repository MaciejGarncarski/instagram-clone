import { ReactNode } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

type PostModalButtonsProps = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDeleting: (isOpen: boolean) => void;
};

type ButtonData = {
  icon: ReactNode;
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
      icon: <BiTrash />,
    },
    {
      text: 'edit',
      icon: <BiEdit />,
    },
    {
      text: 'cancel',
      onClick: closeMenu,
      icon: <CgClose />,
    },
  ];

  return { buttonData };
};
