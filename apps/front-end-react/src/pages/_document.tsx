import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        </Head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
