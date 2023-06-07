import axios from 'axios';
import { getSession } from 'next-auth/react';
import type { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const client = axios.create(options);

client.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session != null)
    request.headers.Authorization = `Bearer ${session.user.accessToken}`;

  return request;
});

export default client;
