import { Id, toast, TypeOptions } from 'react-toastify';

type UpdateToast = {
  toastId: string | number | Id;
  text: string;
  type: TypeOptions;
};

export const updateToast = ({ toastId, text, type }: UpdateToast) => {
  toast.update(toastId, {
    render: text,
    isLoading: false,
    autoClose: 2200,
    closeOnClick: true,
    closeButton: true,
    type: type,
  });
};
