import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { username } = req.body;

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  try {
    const prismaData = await prisma.profiles.findFirst({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            id: 'desc',
          },
        },

        _count: {
          select: {
            posts: true,
            fromUser: true,
            toUser: true,
          },
        },
      },
    });

    const isFollowing = await prisma.followers.findFirst({
      where: {
        from: user?.id,
        to: prismaData?.id,
      },
    });

    res.status(200).send({ profile: prismaData, isFollowing: Boolean(isFollowing) });
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
};

export default handler;
