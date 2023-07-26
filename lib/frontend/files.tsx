import heic2any from 'heic2any';

export const convertHEIXToImage = async (file: File): Promise<Blob | Blob[]> => {
  return await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 1,
  });
};
