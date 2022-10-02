import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';

const url = dev ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const apiClient = axios.create({
  baseURL: `${url}/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
