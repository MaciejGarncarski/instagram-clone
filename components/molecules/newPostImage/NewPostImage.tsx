/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { CgAddR } from 'react-icons/cg';
import ReactCrop from 'react-image-crop';

import { useNewPost } from '@/hooks/posts/useNewPost';
import { useCreateImage } from '@/hooks/useCreateImage';

import styles from './newPostImage.module.scss';

import { aspectAtom, completedCropAtom, cropAtom, imgSrcAtom } from '@/store/store';

export const NewPostImage = () => {
  const [aspect] = useAtom(aspectAtom);
  const [crop, setCrop] = useAtom(cropAtom);
  const [imgSrc] = useAtom(imgSrcAtom);
  const [, setCompletedCrop] = useAtom(completedCropAtom);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const { handleImg, onImageLoad } = useNewPost();

  useCreateImage({ imgRef, previewCanvasRef });

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
        <div className={styles.label}>
          <canvas className='visually-hidden' ref={previewCanvasRef}></canvas>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        </div>
      ) : (
        <label className={styles.label} htmlFor='file'>
          <CgAddR size={50} />
        </label>
      )}
    </>
  );
};
