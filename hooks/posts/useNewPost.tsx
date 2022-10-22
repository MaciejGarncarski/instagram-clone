import { useAtom } from 'jotai';
import { ChangeEvent, SyntheticEvent } from 'react';

import { centerAspectCrop } from '@/lib/centerAspect';

import { aspectAtom, cropAtom, imgSrcAtom } from '@/store/store';

export const useNewPost = () => {
  const [, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCrop] = useAtom(cropAtom);
  const [aspect] = useAtom(aspectAtom);

  const handleImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    if (!ev.target.files[0]) {
      return;
    }

    const src = URL.createObjectURL(ev.target.files[0]);
    setImgSrc(src);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  return { handleImg, onImageLoad };
};
