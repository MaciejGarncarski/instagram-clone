import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export const ACCEPTED_IMG_TYPES = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
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
}
