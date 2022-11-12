import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { description, location, postID, type, publicUrl, author_id, uuid, post_id },
  } = req;

  if (method !== 'POST') {
    res.send(405);
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
    } catch (e) {
      res.status(400);
    }
  }

  if (type === 'CREATE') {
    try {
      await prisma.posts.create({
        data: {
          img: publicUrl,
          description: description,
          author_id: author_id,
          img_uuid: uuid,
          location,
        },
        select: {
          created_at: true,
          id: true,
        },
      });
      res.status(200).send('success');
    } catch (e) {
      res.status(400);
    }
  }

  if (type === 'REMOVE') {
    try {
      await prisma.posts_likes.deleteMany({
        where: {
          post_id,
        },
      });
      await prisma.posts_comments.deleteMany({
        where: {
          post_id,
        },
      });
      await prisma.posts.delete({
        where: {
          id: post_id,
        },
      });

      res.status(200).send('success');
    } catch (e) {
      res.status(400);
    }
  }
});

export default handler;
