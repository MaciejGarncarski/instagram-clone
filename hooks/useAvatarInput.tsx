import axios from 'axios';
import { toast } from 'react-toastify';

import { useUploadAvatar } from '@/hooks/profile/useUploadAvatar';

type UploadNewImage = {
  avatarBase64: string | null;
  resetState: () => void;
};

export const useAvatarInput = () => {
  const { mutate } = useUploadAvatar();

  const uploadNewImage = async ({ avatarBase64, resetState }: UploadNewImage) => {
    if (!avatarBase64) {
      toast.error('No file selected');
      return;
    }

    const addingImage = toast.loading('Uploading new image...');

    mutate(
      { avatarBase64 },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === 'string') {
              toast.error(error.response.data);
            }
          }
        },
        onSuccess: () => {
          toast.update(addingImage, {
            render: 'Updated profile picture',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          });
        },
        onSettled: resetState,
      }
    );
  };

  return { uploadNewImage };
};
