import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Typography variant="h5">
        <Link href="/">Document GPT</Link>
      </Typography>

      <ul className={styles.footerLinkList}>
        <li>
          <Typography variant="body1">
            <Link href={'https://github.com/jaysongiroux/document-gpt'}>Github Source Code</Link>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <Link href="https://nextjs.org/">Next.js</Link>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <Link href="https://tesseract.projectnaptha.com/">tesseract.js</Link>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <Link href="https://openai.com/">OpenAI</Link>
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
