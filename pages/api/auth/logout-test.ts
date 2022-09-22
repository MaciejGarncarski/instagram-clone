import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(500).send('eloo');
};

export default handler;
