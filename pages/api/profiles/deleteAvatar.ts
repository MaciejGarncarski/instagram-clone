import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        id: user.id,
      },
      data: {
        avatar_url: null,
      },
    });

    if (prismaData) {
      res.status(200).send(prismaData);
    } else {
      res.status(400).send(`Couldn't remove profile photo`);
    }
  } catch (e) {
    res.status(400).send(`Wrong api call`);
  }
}
