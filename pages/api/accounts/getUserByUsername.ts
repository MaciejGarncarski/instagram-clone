import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { username } = req.body;

  try {
    const prismaData = await prisma.profiles.findFirst({
      where: {
        username,
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
            fromUser: true,
            toUser: true,
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
