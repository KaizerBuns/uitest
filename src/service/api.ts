import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
