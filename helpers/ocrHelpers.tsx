import { fetchAPI } from '@/lib/frontend/fetchAPI';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { stripRawTextFromPDF } from './pdfHelpers';

export const handleTranslate = async (
  submittedFile: File,
  setOcrLoading: Dispatch<SetStateAction<boolean>>,
  setOcrText: Dispatch<SetStateAction<string | null>>,
) => {
  if (!submittedFile) return;
  // get OCR Raw text from API POST /api/ocr using axios

  if (submittedFile.type === 'application/pdf') {
    try {
      const rawText = await stripRawTextFromPDF(submittedFile);
      setOcrText(rawText);
    } catch (error: any) {
      toast.error(error?.message ?? error);
    } finally {
      return;
    }
  }

  const formData = new FormData();
  formData.append('file', submittedFile);
  setOcrLoading(true);
  fetchAPI({
    method: 'POST',
    url: '/api/ocr',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(({ data }) => {
      setOcrText(data?.data);
    })
    .catch(() => {
      toast.error('There was an error translating your document');
    })
    .finally(() => {
      setOcrLoading(false);
    });
};
