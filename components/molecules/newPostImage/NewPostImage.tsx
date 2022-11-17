/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import ReactCrop from 'react-image-crop';

import { useImageInput } from '@/hooks/posts/useImageInput';
import { useCreateImage } from '@/hooks/useCreateImage';

import styles from './newPostImage.module.scss';

import { Button } from '@/components/atoms/button/Button';

import { aspectAtom, completedCropAtom, cropAtom, imgSrcAtom, newImgAtom } from '@/store/store';

type ButtonData = {
  aspectRatio: number;
  text: string;
};

const buttonData: Array<ButtonData> = [
  {
    aspectRatio: 1,
    text: '1:1',
  },
  {
    aspectRatio: 4 / 5,
    text: '4:5',
  },
  {
    aspectRatio: 1.91 / 1,
    text: '1.91:1',
  },
];

export const NewPostImage = () => {
  const [aspect, setAspect] = useAtom(aspectAtom);
  const [crop, setCrop] = useAtom(cropAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [, setCompletedCrop] = useAtom(completedCropAtom);
  const [, setNewImg] = useAtom(newImgAtom);
  const [completedCrop] = useAtom(completedCropAtom);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const { handleImg, onImageLoad } = useImageInput({ aspect, setCrop, setImgSrc });

  useCreateImage({ imgRef, previewCanvasRef, completedCrop, setNewImg });

  const handleClick = (aspect: number) => {
    setCrop(undefined);
    setAspect(aspect);
  };

  return (
    <>
      <input
        className={clsx('visually-hidden', styles.input)}
        type='file'
        accept='image/*'
        onChange={handleImg}
        id='file'
        name='new post'
      />
      {imgSrc !== '' && (
        <>
          <div className={styles.preview}>
            <canvas className='visually-hidden' ref={previewCanvasRef}></canvas>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              key={aspect}
              aspect={aspect}
              className={styles.crop}
            >
              <img ref={imgRef} alt='' src={imgSrc} onLoad={onImageLoad} />
            </ReactCrop>
          </div>
          <div className={styles.buttons}>
            <h4>Aspect ratio</h4>
            {buttonData.map(({ aspectRatio, text }) => {
              return (
                <Button
                  type='button'
                  className={clsx(aspect === aspectRatio && styles.activeBtn, styles.button)}
                  key={text}
                  onClick={() => handleClick(aspectRatio)}
                >
                  {text}
                </Button>
              );
            })}
          </div>
        </>
      )}
      {imgSrc === '' && (
        <label className={styles.label} htmlFor='file'>
          select from comptuer
        </label>
      )}
    </>
  );
};
