import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  username: string;
  website: string;
  bio: string;
  id: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
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
    res.status(200).send('ok');
  } catch (e) {
    res.status(400);
  }
}
