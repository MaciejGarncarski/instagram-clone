import { RefObject, SetStateAction, useEffect } from 'react';
import { PixelCrop } from 'react-image-crop';

import { canvasPreview } from '@/utils/canvasPreview';

export type UseCreateImageProps = {
  imgRef: RefObject<HTMLImageElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  completedCrop: PixelCrop | null;
  setNewImg: (update: SetStateAction<Blob | null>) => void;
};

export const useCreateImage = ({
  imgRef,
  previewCanvasRef,
  completedCrop,
  setNewImg,
}: UseCreateImageProps) => {
  useEffect(() => {
    const createImg = async () => {
      if (
        !imgRef.current ||
        !previewCanvasRef.current ||
        !completedCrop?.height ||
        !completedCrop.width
      ) {
        return;
      }
      const newImg = await canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      setNewImg(newImg);
    };
    createImg();
  }, [completedCrop, imgRef, previewCanvasRef, setNewImg]);
};
