import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='apple-touch-icon' href='/icon-256x256.png'></link>
          <link rel='icon' href='/icon-256x256.png'></link>
          <meta name='theme-color' content='#6cb9e0' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
