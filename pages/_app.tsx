import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const TITLE = 'Document-GPT: Ask questions about your documents';
  const DESCRIPTION =
    'Document-GPT is a tool that allows you to ask questions about your documents. It uses the GPT-3.5 API to generate answers to your questions.';
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        {/* photo */}
        <meta property="og:image" content="https://documentgpt.jasongiroux.com/favicon.png" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://documentgpt.jasongiroux.com" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://documentgpt.jasongiroux.com/favicon.png" />
      </Head>
      <Analytics />
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
