import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { prisma } from '@/utils/db';
import { imageKit } from '@/utils/imageKit';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { description, location, postID, type, author_id, post_id, imageFile },
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
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }

  if (type === 'CREATE') {
    try {
      const uuid = v4();
      const uploadedImage = await imageKit.upload({
        file: imageFile,
        fileName: `post.webp`,
        folder: `${author_id}/posts/${uuid}`,
      });
      const result = await prisma.posts.create({
        data: {
          img: uploadedImage.url,
          file_id: uploadedImage.fileId,
          description,
          author_id,
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
  }

  if (type === 'REMOVE') {
    try {
      const deletedPost = await prisma.posts.delete({
        where: {
          id: post_id,
        },
      });

      if (!deletedPost.file_id) {
        res.status(400).send(400);
        return;
      }

      await imageKit.deleteFile(deletedPost.file_id);
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

      res.status(200).send(200);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
