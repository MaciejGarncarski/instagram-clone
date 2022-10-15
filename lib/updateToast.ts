import { toast, TypeOptions } from 'react-toastify';

type UpdateToast = {
  toastId: string | number;
  text: string;
  type: TypeOptions;
};

export const updateToast = ({ toastId, text, type }: UpdateToast) => {
  toast.update(toastId, {
    render: text,
    isLoading: false,
    autoClose: 4000,
    closeOnClick: true,
    type: type,
  });
};
