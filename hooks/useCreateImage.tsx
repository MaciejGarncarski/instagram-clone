import { useAtom } from 'jotai';
import { RefObject, useEffect } from 'react';

import { canvasPreview } from '@/utils/canvasPreview';

import { completedCropAtom, newImgAtom } from '@/store/store';

export type UseCreateImageProps = {
  imgRef: RefObject<HTMLImageElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
};

export const useCreateImage = ({ imgRef, previewCanvasRef }: UseCreateImageProps) => {
  const [completedCrop] = useAtom(completedCropAtom);
  const [, setNewImg] = useAtom(newImgAtom);

  useEffect(() => {
    const createImg = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        const newImg = await canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
        setNewImg(newImg);
      }
    };
    createImg();
  }, [completedCrop, imgRef, previewCanvasRef, setNewImg]);
};
