import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { take, skip, additionalData },
  } = req;

  if (method !== 'POST') {
    res.status(403);
  }

  try {
    const following = await prisma.followers.findMany({
      where: {
        from: additionalData.userID,
      },
      skip,
      take,
    });
    const followers = await prisma.followers.findMany({
      where: {
        to: additionalData.userID,
      },
      skip,
      take,
    });

    const followersCount = await prisma.followers.aggregate({
      _count: {
        id: true,
      },
      where: {
        to: additionalData.userID,
      },
    });

    const followingCount = await prisma.followers.aggregate({
      _count: {
        id: true,
      },
      where: {
        from: additionalData.userID,
      },
    });

    res.status(200).send({ following, followers, followersCount, followingCount });
  } catch (error) {
    res.status(500);
  }
};

export default handler;
