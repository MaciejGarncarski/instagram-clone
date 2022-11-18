import axios from 'axios';
import { toast } from 'react-toastify';

import { imageBase64 } from '@/hooks/posts/useAddPost';
import { useUploadAvatar } from '@/hooks/profile/useUploadAvatar';

type UploadNewImage = {
  avatarBlob: Blob | null;
  resetState: () => void;
};

export const useAvatarInput = () => {
  const { mutate } = useUploadAvatar();

  const uploadNewImage = async ({ avatarBlob, resetState }: UploadNewImage) => {
    if (!avatarBlob) {
      toast.error('No file selected');
      return;
    }

    const avatar = await imageBase64(avatarBlob);

    const addingImage = toast.loading('Uploading new image...');

    mutate(
      { avatar },
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
