import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          orderBy: {
            id: 'desc',
          },
        },
        fromUser: true,
        toUser: true,

        _count: {
          select: {
            posts: true,
            posts_comments: true,
            posts_likes: true,
            fromUser: true,
            toUser: true,
          },
        },
      },
    });

    const isFollowing = await prisma.followers.findFirst({
      where: {
        from: user?.id,
        to: profile?.id,
      },
    });

    res.status(200).send({ profile, isFollowing });
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
};

export default handler;
