import React, { useMemo } from 'react';
import { Button, Skeleton, Typography } from '../lib/frontend/mui';
import Image from 'next/image';
import { Upload } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import styles from './styles.module.scss';
import '@react-pdf-viewer/core/lib/styles/index.css';

type Props = {
  ocrText: string | null;
  file: File | null;
  ocrLoading: boolean;
  handleSelect: (e: File) => void;
};

const SelectAndFetchDocumentContent = (props: Props) => {
  const { ocrText, file, handleSelect } = props;

  const handleSelectFile = async (e: any) => {
    const file = e.target.files[0];
    // if file is heic convert to jpeg
    if (file?.type === 'image/heic') {
      // raise error if file is heic
      toast.error('HEIC files are not supported. Please convert to JPEG and try again.');
      return;
    }
    handleSelect(file);
  };

  const renderPDF = useMemo(() => {
    if (!file) return null;
    return (
      <div className={styles.image}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
          <Viewer
            fileUrl={URL.createObjectURL(file)}
            httpHeaders={{
              'Access-Control-Allow-Origin': '*',
            }}
          />
        </Worker>
      </div>
    );
  }, [file]);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Typography variant="subtitle1">
          Select a file to upload and then click the button to fetch the OCR text.
        </Typography>
        <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
          Upload File
          <Upload sx={{ paddingLeft: 1 }} />
          <input type="file" hidden onChange={handleSelectFile} />
        </Button>
        {file && (
          <div className={styles.imageRow}>
            {/* if file is image */}
            {file.type.includes('image') && (
              <Image
                className={styles.image}
                width={150}
                height={150}
                alt="Selected image"
                src={URL.createObjectURL(file)}
              />
            )}
            {/* if file is pdf */}
            {file.type.includes('pdf') && renderPDF}
            <div className={styles.ocrTextContainer}>
              {props.ocrLoading ? (
                <>
                  <Skeleton variant="text" height={75} />
                  <Skeleton variant="rectangular" height={118} />
                  <Skeleton variant="rectangular" height={118} />
                </>
              ) : (
                <pre className={styles.preTag}>
                  <Typography variant="h4">OCR Output</Typography>
                  {ocrText}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAndFetchDocumentContent;
