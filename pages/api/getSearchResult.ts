import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { q },
    method,
  } = req;

  if (method !== 'GET') {
    res.status(405).send('Only GET requests allowed');
    return;
  }

  const searchedQuery = typeof q === 'string' ? q : '';

  try {
    const posts = await prisma.posts.findMany({
      where: {
        OR: [
          {
            description: {
              contains: searchedQuery,
              mode: 'insensitive',
            },
          },
          {
            location: {
              contains: searchedQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    const users = await prisma.profiles.findMany({
      where: {
        OR: [
          {
            username: {
              contains: searchedQuery,
              mode: 'insensitive',
            },
          },
          {
            full_name: {
              contains: searchedQuery,
              mode: 'insensitive',
            },
          },
          {
            bio: {
              contains: searchedQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    const shuffledResults = [...posts, ...users];

    res.status(200).send(shuffledResults);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
