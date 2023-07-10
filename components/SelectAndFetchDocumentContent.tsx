import React from 'react';
import { Typography } from '../lib/frontend/mui';
import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {
  ocrText: string | null;
  file: File | null;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectAndFetchDocumentContent = (props: Props) => {
  const { ocrText, file, handleSelect } = props;

  return (
    <>
      <Typography variant="body1">
        <input type="file" onChange={handleSelect} className="fileSelect" />
      </Typography>
      {file && (
        <div className={styles.imageRow}>
          <Image
            className={styles.image}
            width={150}
            height={150}
            alt="Selected image"
            src={URL.createObjectURL(file)}
          />
          <div className={styles.ocrTextContainer}>
            <pre className={styles.preTag}>
              <Typography variant="h4">OCR Output</Typography>
              {ocrText}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectAndFetchDocumentContent;
