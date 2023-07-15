import React from 'react';
import { Inter } from 'next/font/google';
import { Button, Paper, Typography } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import { DocumentScanner, Send } from '@mui/icons-material';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Paper elevation={3} className={styles.paperContainer}>
        <Typography variant="h2">Welcome!</Typography>
        <Typography variant="body1">
          Welcome to document-GPT, a platform you can upload a picture of a document and receive a valid JSON object
          with requested fields, or ask a chatbot questions about that document!
        </Typography>
        <Typography variant="body2">
          The purpose of this app is to process images of documents with english text. Images of anything but text will
          not work.
        </Typography>
        <div className={styles.homeButtonContainer}>
          <Button variant="contained" href="/prefill" className={styles.homeActionButton}>
            <DocumentScanner />
            Document Prefill
          </Button>
          <Button variant="contained" href="/chat" className={styles.homeActionButton}>
            Document Q&A
            <Send />
          </Button>
        </div>
         
      </Paper>
    </div>
  );
}
