import { fileToUint8Array } from '@/lib/backend/files';
import { getDocument } from 'pdfjs-dist';

const TOKEN_LIMIT = 2000;

export const stripRawTextFromPDF = async (pdfFile: File): Promise<string> => {
  const fileBuffer = await fileToUint8Array(pdfFile);

  const pdf = await getDocument(fileBuffer).promise;
  const content = await pdf.getMetadata().then(function () {
    // get all pages text
    const maxPages = pdf.numPages;
    const countPromises: Promise<string>[] = []; // collecting all page promises
    // loop through each page and push promise to array
    for (let j = 1; j <= maxPages; j++) {
      const page = pdf.getPage(j);

      countPromises.push(
        page.then((page) => {
          // add page promise
          return page.getTextContent().then((text) => {
            // return content promise
            return text.items
              .map((s) => {
                if ('str' in s) {
                  return s.str;
                } else {
                  return '';
                }
              })
              .join(''); // value page text
          });
        }),
      );
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then((texts) => {
      return texts.join('<<NEW PAGE>>');
    });
  });

  // set hard limit on tokens. This is a rough estimate of the number of tokens in a page
  const numberOfTokens = content.split(' ').length;
  if (numberOfTokens > TOKEN_LIMIT) {
    throw Error(`PDF is too large. Content exceeds ${TOKEN_LIMIT} tokens. Please upload a smaller PDF`);
  }

  return content;
};
