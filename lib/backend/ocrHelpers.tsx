import { recognize } from 'tesseract.js';

export const readTextFromImage = async (file: Buffer) => {
  try {
    const {
      data: { text },
    } = await recognize(file);
    return text;
  } catch (error) {
    console.log('Error OCR:', error);
    throw error;
  }
};
