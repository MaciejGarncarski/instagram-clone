import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    res.status(405).send('Only PATCH requests allowed');
    return;
  }

  const { fullName, username, bio, id, profile_id } = req.body;

  try {
    const updatedProfile = await prisma.profiles.update({
      where: {
        id: id,
      },
      data: {
        full_name: fullName,
        username,
        bio,
        profile_id,
      },
    });
    res.status(200).send('success');
    return updatedProfile;
  } catch (e) {
    res.status(400).send(e);
  }
});

export default handler;
