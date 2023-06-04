import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const client = axios.create(options);

export default client;
