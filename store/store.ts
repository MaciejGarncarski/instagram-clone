import { User } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const accountFormDisabled = atom<boolean>(true);
export const userAtom = atom<User | undefined | null>(undefined);
export const userDataAtom = atom<User | null>(null);

export const changeAvatarError = atom<string | null>(null);

export const charCountAtom = atom<number>(0);
