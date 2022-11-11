/* eslint-disable @next/next/no-img-element */
import { RefObject, SetStateAction, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';

import { useNewPost } from '@/hooks/posts/useNewPost';
import { useAvatarInput } from '@/hooks/useAvatarInput';
import { useCreateImage } from '@/hooks/useCreateImage';

import styles from './userAvatarModal.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';

type UserAvatarModalProps = {
  setIsEditing: (isEditing: boolean) => void;
  imgSrc: string;
  setImgSrc: (update: SetStateAction<string>) => void;
  imgRef: RefObject<HTMLImageElement>;
};

export const UserAvatarModal = ({
  setIsEditing,
  imgSrc,
  setImgSrc,
  imgRef,
}: UserAvatarModalProps) => {
  const { uploadNewImage } = useAvatarInput();

  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [newImg, setNewImg] = useState<Blob | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const { onImageLoad } = useNewPost({ aspect: 1, setCrop, setImgSrc });

  useCreateImage({ imgRef, previewCanvasRef, completedCrop, setNewImg });

  const resetState = () => {
    setIsEditing(false);
    setCrop(undefined);
    setImgSrc('');
    setCompletedCrop(null);
    setNewImg(null);
  };

  const onCancel = () => {
    setIsEditing(false);
    resetState();
  };

  return (
    <ModalContainer onClose={() => setIsEditing(false)}>
      <canvas className='visually-hidden' ref={previewCanvasRef}></canvas>
      <div className={styles.modal}>
        <h3 className={styles.modalHeading}>crop your avatar</h3>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          className={styles.crop}
        >
          <img ref={imgRef} alt='' src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
        <div className={styles.modalButtons}>
          <Button onClick={onCancel} type='button' variant='red'>
            cancel
          </Button>
          <Button
            onClick={() => uploadNewImage(newImg, resetState)}
            type='button'
            variant='gradient'
          >
            Submit new avatar
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};
