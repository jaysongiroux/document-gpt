import { createWorker } from 'tesseract.js';

export const readTextFromImage = async (file: Buffer) => {
  try {
    const worker = await createWorker({
      logger: (m) => {
        console.log(m);
      },
    });
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const {
      data: { text },
    } = await worker.recognize(file);
    await worker.terminate();
    return text;
  } catch (error) {
    console.log('Error OCR:', error);
    throw error;
  }
};
