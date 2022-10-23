/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { CgAddR } from 'react-icons/cg';
import ReactCrop from 'react-image-crop';

import { useNewPost } from '@/hooks/posts/useNewPost';
import { useCreateImage } from '@/hooks/useCreateImage';

import styles from './newPostImage.module.scss';

import { Button } from '@/components/atoms/button/Button';

import { aspectAtom, completedCropAtom, cropAtom, imgSrcAtom } from '@/store/store';

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
  const [imgSrc] = useAtom(imgSrcAtom);
  const [, setCompletedCrop] = useAtom(completedCropAtom);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const { handleImg, onImageLoad } = useNewPost();

  useCreateImage({ imgRef, previewCanvasRef });

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
      {imgSrc !== '' ? (
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
              <img ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
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
      ) : (
        <label className={styles.label} htmlFor='file'>
          <CgAddR size={50} />
          <p>Add image here</p>
        </label>
      )}
    </>
  );
};
