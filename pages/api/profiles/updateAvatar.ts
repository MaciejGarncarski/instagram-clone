// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  id: string;
  avatarUrl: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const body: Body = JSON.parse(req.body);
  console.log(body);
  try {
    const prismaData = await prisma.profiles.update({
      where: {
        id: body.id,
      },
      data: {
        avatar_url: body.avatarUrl,
      },
    });

    res.status(200).send(prismaData);
  } catch (e) {
    res.status(500).send(`Wrong api call ${e}`);
  }
}
