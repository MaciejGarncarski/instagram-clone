import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.signOut();
  res.redirect('/auth/login');
}
