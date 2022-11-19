import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  if (typeof query.from !== 'string' || typeof query.to !== 'string') {
    res.status(400).send('bad request');
    return;
  }

  const isFollowing = await prisma.followers.findFirst({
    where: {
      from: query.from,
      to: query.to,
    },
  });

  if (method === 'PUT' && isFollowing) {
    res.status(400).send('Follow already exists.');
  }

  if (method === 'PUT' && !isFollowing) {
    try {
      await prisma.followers.create({
        data: {
          from: query.from,
          to: query.to,
        },
        select: {
          created_at: true,
          id: true,
        },
      });
      res.status(200).send('success');
    } catch (err) {
      res.status(500);
    }
  }

  if (method === 'DELETE') {
    try {
      await prisma.followers.deleteMany({
        where: {
          from: query.from,
          to: query.to,
        },
      });
      res.status(200).send('success');
    } catch (err) {
      res.status(500);
    }
  }
};

export default handler;
