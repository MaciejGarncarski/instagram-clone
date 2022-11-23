import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';
import { imageKit } from '@/utils/imageKit';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, location, postID, type } = req.body;

  if (req.method !== 'POST') {
    res.status(405).send(405);
    return;
  }

  if (type === 'UPDATE') {
    try {
      await prisma.posts.update({
        where: {
          id: postID,
        },
        data: {
          description,
          location,
        },
      });
      res.status(200).send('success');
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }

  if (type === 'REMOVE') {
    try {
      await prisma.posts_likes.deleteMany({
        where: {
          post_id: postID,
        },
      });
      await prisma.posts_comments.deleteMany({
        where: {
          post_id: postID,
        },
      });

      const deletedPost = await prisma.posts.delete({
        where: {
          id: postID,
        },
      });

      if (!deletedPost.file_id) {
        res.status(400).send(400);
        return;
      }

      await imageKit.deleteFile(deletedPost.file_id);

      res.status(200).send(200);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }
});

export default handler;

export const config = {
  api: {
    responseLimit: '12mb',
    bodyParser: {
      sizeLimit: '32mb',
    },
  },
};
