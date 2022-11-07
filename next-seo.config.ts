import { NextSeoProps } from 'next-seo';

const title = 'Delaygram';
const description = 'Delaygram - Instagram clone created with Next.js, supabase, prisma';

const url = 'https://delaygram.vercel.app/';

export const SEO: NextSeoProps = {
  title,
  description,
  canonical: url,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicons/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      href: '/favicons/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      href: '/favicons/android-chrome-512x512.png',
      sizes: '512x512',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicons/apple-touch-icon.png',
      sizes: '256x256',
    },
    {
      rel: 'manifest',
      href: '/manifest.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url,
    title,
    description,
    images: [
      {
        url: `${url}icon-512x512.png`,
        alt: title,
        width: 512,
        height: 512,
      },
    ],
  },
};
