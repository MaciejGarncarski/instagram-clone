import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).send('Only PUT requests allowed');
    return;
  }

  try {
    await prisma.posts.create({
      data: {
        img: req.body.imgURL,
        description: req.body.description,
        author_id: req.body.author_id,
        img_uuid: req.body.uuid,
      },
      select: {
        created_at: true,
        id: true,
      },
    });
    res.status(200).send('200');
  } catch (e) {
    res.status(400).send('400');
  }
});

export default handler;
