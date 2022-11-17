import { atom } from 'jotai';
import { Crop, PixelCrop } from 'react-image-crop';

export const charCountAtom = atom<number>(0);
export const postModalAtom = atom<boolean>(false);

export const aspectAtom = atom<number>(1);
export const completedCropAtom = atom<PixelCrop | null>(null);
export const newImgAtom = atom<string | null>(null);
export const imgSrcAtom = atom<string>('');
export const cropAtom = atom<Crop | undefined>(undefined);
