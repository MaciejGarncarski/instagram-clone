// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export const ACCEPTED_IMG_TYPES = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  // const isValidIMG = ACCEPTED_IMG_TYPES.includes(fileType);

  // if (!isValidIMG) {
  //   res.status(400).send('Invalid image type!');
  //   return;
  // }

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
    res.status(500).send(`Wrong api call ${e}`);
  }
}
