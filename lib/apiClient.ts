import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';

const url = dev ? 'http://localhost:3000' : `https://delaygram-dev.vercel.app`;

export const apiClient = axios.create({
  baseURL: `${url}/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
