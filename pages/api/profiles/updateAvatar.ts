import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';

export const ACCEPTED_IMG_TYPES = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (req.method !== 'PATCH') {
    res.status(405).send('Only PATCH requests allowed');
    return;
  }

  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

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
};

export default handler;
