import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;
