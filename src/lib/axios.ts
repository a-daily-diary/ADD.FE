import axios from 'axios';
import { getSession } from 'next-auth/react';
import type { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const client = axios.create(options);

client.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session !== null) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  async (error) => await Promise.reject(error),
);

export default client;
