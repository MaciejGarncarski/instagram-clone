import { ReactNode } from 'react';

import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { DeleteIcon } from '@/components/atoms/icons/DeleteIcon';
import { EditIcon } from '@/components/atoms/icons/EditIcon';

type PostModalButtonsProps = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDeleting: (isOpen: boolean) => void;
  setIsEditing: (isOpen: boolean) => void;
};

type ButtonData = {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  variant?: 'red';
};

export const usePostModalButtons = ({
  setIsDeleting,
  setIsOpen,
  setIsEditing,
}: PostModalButtonsProps) => {
  const closeMenu = () => {
    setIsOpen(false);
  };

  const openDeleteModal = () => {
    setIsOpen(false);
    setIsDeleting(true);
  };

  const openEditModal = () => {
    setIsOpen(false);
    setIsEditing(true);
  };

  const buttonData: Array<ButtonData> = [
    {
      text: 'remove',
      variant: 'red',
      icon: <DeleteIcon />,
      onClick: openDeleteModal,
    },
    {
      text: 'edit',
      icon: <EditIcon />,
      onClick: openEditModal,
    },
    {
      text: 'cancel',
      icon: <CancelIcon />,
      onClick: closeMenu,
    },
  ];

  return { buttonData };
};
