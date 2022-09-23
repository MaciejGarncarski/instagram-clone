import { PrismaClient } from '@prisma/client';
import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  try {
    await prisma.posts.delete({
      where: {
        id: req.body.post_id,
      },
    });
    res.status(200).send('200');
  } catch (e) {
    res.status(400).send('400');
  }
});

export default handler;
