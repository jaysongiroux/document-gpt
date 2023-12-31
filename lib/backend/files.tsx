import fs from 'fs';

export const fileToBuffer = async (file: any): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const reader = fs.createReadStream(file.filepath);
    const chunks: Uint8Array[] = [];

    reader.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk);
    });

    reader.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });

    reader.on('error', (error: Error) => {
      reject(error);
    });
  });
};

export const fileToUint8Array = async (file: any): Promise<Uint8Array> => {
  const buffer = await fileToBuffer(file);
  return new Uint8Array(buffer);
};
