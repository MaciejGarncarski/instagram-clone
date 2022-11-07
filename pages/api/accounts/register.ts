import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { id, username, fullName } = req.body;

  try {
    const updatedProfile = await prisma.profiles.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        full_name: fullName,
      },
    });
    res.status(200).send('success');
    return updatedProfile;
  } catch (e) {
    res.status(400).send(e);
  }
};

export default handler;
