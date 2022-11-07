import { User } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { Crop, PixelCrop } from 'react-image-crop';

export const userAtom = atom<User | undefined | null>(undefined);
export const charCountAtom = atom<number>(0);
export const changeAvatarError = atom<string | null>(null);
export const newPostPreviewAtom = atom<string | null>(null);

export const postModalAtom = atom<boolean>(false);

export const aspectAtom = atom<number>(1);
export const completedCropAtom = atom<PixelCrop | null>(null);
export const newImgAtom = atom<Blob | null>(null);
export const imgSrcAtom = atom<string>('');
export const cropAtom = atom<Crop | undefined>(undefined);
