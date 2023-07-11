// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseForm } from '../../lib/backend/form';
import { fileToBuffer } from '../../lib/backend/files';
import { readTextFromImage } from '../../lib/backend/ocrHelpers';

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
  console.log('OCR Started');

  const { files } = await parseForm(req, false);
  if (!files?.file) {
    res.status(400).json({ error: 'No file found' });
    return;
  }
  const file = Array.isArray(files.file) ? files.file[0] : files.file;

  if (!file) {
    return res.status(400).json({ error: 'No file found' });
  }

  const imageBuffer = await fileToBuffer(file as unknown as File);
  const text: string = await readTextFromImage(imageBuffer);

  console.log('OCR Finished');
  res.status(200).json({ data: text });
}

// OCR Started
// Aborted(Error: ENOENT: no such file or directory, open '/var/task/node_modules/tesseract.js-core/tesseract-core-simd.wasm')
// Uncaught Exception 	{"errorType":"RuntimeError","errorMessage":"Aborted(Error: ENOENT: no such file or directory, open '/var/task/node_modules/tesseract.js-core/tesseract-core-simd.wasm'). Build with -sASSERTIONS for more info.","stack":["RuntimeError: Aborted(Error: ENOENT: no such file or directory, open '/var/task/node_modules/tesseract.js-core/tesseract-core-simd.wasm'). Build with -sASSERTIONS for more info.","    at n (/var/task/node_modules/tesseract.js-core/tesseract-core-simd.js:18:375)","    at Ua (/var/task/node_modules/tesseract.js-core/tesseract-core-simd.js:19:317)","    at /var/task/node_modules/tesseract.js-core/tesseract-core-simd.js:20:394"]}
// Unknown application error occurred
// Runtime.Unknown