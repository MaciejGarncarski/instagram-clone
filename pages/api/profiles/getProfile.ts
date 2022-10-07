import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prismaData = await prisma.profiles.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        posts: {
          orderBy: {
            id: 'desc',
          },
        },

        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    res.status(200).send(prismaData);
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
};

export default handler;
