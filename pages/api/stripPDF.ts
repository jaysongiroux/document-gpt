// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseForm } from '../../lib/backend/form';
import { stripRawTextFromPDF } from '@/helpers/pdfHelpers';

type Data = {
  data?: string;
  error?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, please use POST' });
    return;
  }
  console.log('PDF Started');

  const { files } = await parseForm(req, false);
  if (!files?.file) {
    res.status(400).json({ error: 'No file found' });
    return;
  }

  const file = Array.isArray(files.file) ? files.file[0] : files.file;

  if (!file) {
    return res.status(400).json({ error: 'No file found' });
  }

  // if file is pdf
  if (file?.mimetype === 'application/pdf') {
    // strip text from pdf file
    try {
      const rawText = await stripRawTextFromPDF(file as unknown as File);
      console.log('PDF Finished');
      return res.status(200).json({ data: rawText });
    } catch (error: any) {
      console.log('PDF Finished ERROR: ', error);
      return res.status(500).json({ error: error?.message ?? error });
    }
  }
  // if not a pdf raise an error
  console.log('PDF Finished ERROR: File is not a pdf');
  return res.status(400).json({ error: 'File is not a pdf' });
}
