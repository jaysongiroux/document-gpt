// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { convertTextToJsonChatGPT } from '../../lib/backend/aiHelpers';

type Data = {
  data?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, please use POST' });
    return;
  }

  console.log('Prefill Started');
  const { body } = req;
  if (!body.context || !body.prompt) {
    res.status(400).json({ error: 'No context or prompt found' });
    return;
  }

  try {
    const JSONdata = await convertTextToJsonChatGPT(
      body.context,
      body.prompt,
      body.token ?? process?.env?.OPEN_AI_API_TOKEN,
    );
    console.log('Prefill Finished');
    return res.status(200).json({ data: JSONdata });
  } catch (error: any) {
    console.log('Prefill Finished - Error');
    return res.status(500).json({ error });
  }
}
