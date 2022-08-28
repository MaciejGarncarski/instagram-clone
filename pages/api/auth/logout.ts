import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { error } = await supabase.auth.signOut();
  if (error) {
    res.status(400).send('Error while logging out');
  }
  res.redirect('/auth/login');
}
