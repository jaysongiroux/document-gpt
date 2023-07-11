import React from 'react';
import { Button, CircularProgress, Skeleton, Typography } from '../lib/frontend/mui';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Upload } from '@mui/icons-material';

type Props = {
  ocrText: string | null;
  file: File | null;
  ocrLoading: boolean;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectAndFetchDocumentContent = (props: Props) => {
  const { ocrText, file, handleSelect } = props;

  return (
    <>
      <Typography variant="subtitle1">
        Select a file to upload and then click the button to fetch the OCR text.
      </Typography>
      <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
        Upload File
        <Upload sx={{ paddingLeft: 1 }} />
        <input type="file" hidden onChange={handleSelect} />
      </Button>
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
    </>
  );
};

export default SelectAndFetchDocumentContent;
