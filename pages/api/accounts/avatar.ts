import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { type, id, avatarURL },
  } = req;

  if (method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  if (type === 'REMOVE') {
    try {
      const removePhoto = await prisma.profiles.update({
        where: {
          id,
        },
        data: {
          avatar_url: null,
        },
      });

      if (removePhoto) {
        res.status(200);
      } else {
        res.status(400).send(`Couldn't remove profile photo`);
      }
    } catch (e) {
      res.status(400);
    }
  }

  if (type === 'UPDATE') {
    try {
      const updatedAvatar = await prisma.profiles.update({
        where: {
          id,
        },
        data: {
          avatar_url: avatarURL,
        },
      });

      res.status(200).send(updatedAvatar);
    } catch (e) {
      res.status(400);
    }
  }
});

export default handler;
