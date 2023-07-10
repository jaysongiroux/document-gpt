// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { askQuestion } from '../../lib/backend/aiHelpers';

type Data = {
  data?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, please use POST' });
    return;
  }

  console.log('Chat Started');
  const { body } = req;

  if (!body.context || !body.question) {
    res.status(400).json({ error: 'No context or question found' });
    return;
  }

  const reply = await askQuestion(body.question, body.context, body.token ?? process?.env?.OPEN_AI_API_TOKEN);
  if (!reply) {
    res.status(500).json({ error: 'No reply found' });
    return;
  }
  console.log('chat Finished');
  res.status(200).json({ data: reply });
}
