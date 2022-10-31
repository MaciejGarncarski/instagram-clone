import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='apple-touch-icon' href='/icon-256x256.png'></link>
          <link rel='icon' href='/icon-256x256.png'></link>
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div className='modal'></div>
          <div className='post-modal'></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
