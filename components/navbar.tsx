import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Typography } from '@mui/material';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className={styles.navbarContainer}>
      <Link href="/">
        <Typography variant="h4" className={styles.navbarHeader}>
          Document GPT
        </Typography>
      </Link>
      <ul className={styles.navBarList}>
        <li>
          <Typography variant="body1">
            <Link href="/prefill">Prefill</Link>
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <Link href="/chat">Document Q&A</Link>
          </Typography>
        </li>
      </ul>
    </div>
  );
}
