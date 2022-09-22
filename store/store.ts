import { User } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const userAtom = atom<User | undefined | null>(undefined);
export const charCountAtom = atom<number>(0);
export const changeAvatarError = atom<string | null>(null);
export const newPostPreviewAtom = atom<string | null>(null);
