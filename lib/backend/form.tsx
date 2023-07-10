import { Fields, Files, IncomingForm } from 'formidable';
import { IncomingMessage } from 'http';

export const parseForm = (req: IncomingMessage, multiples = false): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({ multiples, allowEmptyFiles: false });

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};
