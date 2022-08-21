// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '@/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  try {
    const prismaData = await prismaClient.profiles.findUnique({
      where: {
        id: body.id,
      },
    });

    res.status(200).send(prismaData);
  } catch (e) {
    res.status(500).send(`Wrong api call`);
  }
}
