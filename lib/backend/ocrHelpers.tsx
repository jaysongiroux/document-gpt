import Tesseract from 'tesseract.js';

// add binarization and other image processing here
export const readTextFromImage = async (file: Buffer) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(file, 'eng', {});

    return text;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
