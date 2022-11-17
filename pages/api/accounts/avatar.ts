import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { AvatarRequest } from '@/hooks/profile/useUploadAvatar';
import { prisma } from '@/utils/db';
import { imageKit } from '@/utils/imageKit';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const body: AvatarRequest = req.body;
  const { avatarBase64, id, type } = body;
  const uuid = v4();

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

      if (removePhoto.avatar_file_id) {
        await imageKit.deleteFile(removePhoto.avatar_file_id);
        await prisma.profiles.update({
          where: {
            id,
          },
          data: {
            avatar_file_id: null,
          },
        });
        res.status(200).send(200);
      } else {
        res.status(400).send(`Couldn't remove profile photo`);
      }
    } catch (e) {
      res.status(400);
    }
  }

  if (type === 'UPDATE') {
    if (!avatarBase64) {
      res.status(404).send('No avatarBase64 provided.');
      return;
    }

    try {
      const uploadedAvatar = await imageKit.upload({
        file: avatarBase64,
        fileName: `avatar.webp`,
        folder: `${id}/avatars/${uuid}`,
      });

      await prisma.profiles.update({
        where: {
          id,
        },
        data: {
          avatar_url: uploadedAvatar.url,
          avatar_file_id: uploadedAvatar.fileId,
        },
      });

      res.status(200).send(200);
    } catch (e) {
      res.status(400);
    }
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '32mb',
    },
  },
};
