import { PrismaClient } from '@prisma/client';
import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  try {
    const prismaData = await prisma.profiles.findUnique({
      where: {
        id: req.body.id,
      },
    });

    res.status(200).send(prismaData);
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
});

export default handler;
