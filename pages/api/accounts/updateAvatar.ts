import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    res.status(405).send('Only PATCH requests allowed');
    return;
  }

  try {
    const prismaData = await prisma.profiles.update({
      where: {
        id: req.body.id,
      },
      data: {
        avatar_url: req.body.avatarURL,
      },
    });

    res.status(200).send(prismaData);
  } catch (e) {
    res.status(400).send(`Wrong api call ${e}`);
  }
});

export default handler;
