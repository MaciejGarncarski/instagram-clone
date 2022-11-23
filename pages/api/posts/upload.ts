import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import dns from 'node:dns';
import { v4 } from 'uuid';

import { prisma } from '@/utils/db';
import { imageKit } from '@/utils/imageKit';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, location, authorID, imageFile } = req.body;
  const uuid = v4();

  dns.setDefaultResultOrder('ipv4first');

  if (req.method !== 'POST') {
    res.status(405).send(405);
    return;
  }

  try {
    const uploadedImage = await imageKit.upload({
      file: imageFile,
      fileName: `post.webp`,
      folder: `${authorID}/posts/${uuid}`,
    });

    if (!uploadedImage) {
      res.status(400).json({ message: 'error' });
      return;
    }

    await prisma.posts.create({
      data: {
        img: uploadedImage.url,
        file_id: uploadedImage.fileId,
        description,
        author_id: authorID,
        location,
      },
      select: {
        created_at: true,
        id: true,
      },
    });

    res.status(200).send('success');
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err });
  }
});

export default handler;
