import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='apple-touch-icon' href='/icon-256x256.png'></link>
          <link rel='icon' href='/icon-256x256.png'></link>
          <meta
            name='description'
            content='Delay - Instagram Clonse made using next.js, sass, supabase, prisma'
          />
          <meta name='robots' content='all' />
          <meta name='theme-color' content='#6cb9e0' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div className='modal'></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
