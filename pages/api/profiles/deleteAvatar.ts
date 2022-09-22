import { PrismaClient } from '@prisma/client';
import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

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
        avatar_url: null,
      },
    });

    if (prismaData) {
      res.status(200).send(prismaData);
    } else {
      res.status(400).send(`Couldn't remove profile photo`);
    }
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
});

export default handler;
