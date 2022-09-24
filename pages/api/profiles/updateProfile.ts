import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

type Body = {
  username: string;
  website: string;
  bio: string;
  id: string;
};

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const body: Body = req.body;

  try {
    await prisma.profiles.update({
      where: {
        id: body.id,
      },
      data: {
        username: body.username,
        bio: body.bio,
        website: body.website,
      },
    });
    res.status(200).send('success');
  } catch (e) {
    res.status(400).send(e);
  }
});

export default handler;
