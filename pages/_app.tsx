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
  return (
    <>
      <Head>
        <title>Document-GPT: Ask questions about your documents</title>
        <meta
          name="description"
          content="Document-GPT is a tool that allows you to ask questions about your documents. It uses the GPT-3.5 API to generate answers to your questions."
        />
      </Head>
      <Analytics />
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
