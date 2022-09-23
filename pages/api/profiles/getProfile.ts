import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  try {
    const prismaData = await prisma.profiles.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        posts: true,
        _count: {
          select: { posts: true },
        },
      },
    });
    res.status(200).send(prismaData);
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
};

export default handler;
