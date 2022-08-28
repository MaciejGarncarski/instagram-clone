import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  id: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const body: Body = req.body;

  try {
    const prismaData = await prisma.profiles.findUnique({
      where: {
        id: body.id,
      },
    });

    if (prismaData) {
      res.status(200).send(prismaData);
    } else {
      res.status(400);
    }
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
}
