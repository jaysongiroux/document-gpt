import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed, please use GET' });
    return;
  }
  // if process.env.OPEN_AI_API_TOKEN
  if (process.env.OPEN_AI_API_TOKEN) {
    return res.status(200).json({ data: true });
  } else {
    return res.status(500).json({ error: 'No OPEN_AI_API_TOKEN found' });
  }
}
