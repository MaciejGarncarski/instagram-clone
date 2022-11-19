import { ChangeEvent, SetStateAction, SyntheticEvent } from 'react';
import { Crop } from 'react-image-crop';

import { centerAspectCrop } from '@/lib/centerAspect';

type UseImageInputProps = {
  aspect: number;
  setImgSrc?: (update: SetStateAction<string>) => void;
  setCrop?: (update?: SetStateAction<Crop | undefined>) => void;
};

export const useImageInput = ({ aspect, setImgSrc, setCrop }: UseImageInputProps) => {
  const handleImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    if (!ev.target.files[0]) {
      return;
    }

    const src = URL.createObjectURL(ev.target.files[0]);
    if (setImgSrc) {
      setImgSrc(src);
    }
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      if (setCrop) {
        setCrop(centerAspectCrop(width, height, aspect));
      }
    }
  };

  return { handleImg, onImageLoad };
};
