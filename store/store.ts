import { User } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const userAtom = atom<User | undefined | null>(undefined);
