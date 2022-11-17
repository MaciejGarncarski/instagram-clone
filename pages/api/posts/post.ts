import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { prisma } from '@/utils/db';
import { imageKit } from '@/utils/imageKit';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, location, postID, type, authorID, imageFile } = req.body;
  const uuid = v4();

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
      const uploadedImage = await imageKit.upload({
        file: imageFile,
        fileName: `post.webp`,
        folder: `${authorID}/posts/${uuid}`,
      });
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
