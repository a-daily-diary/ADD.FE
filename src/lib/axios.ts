import axios, { isAxiosError } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import type { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
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

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      alert('접속 시간이 만료되었습니다.\n로그인 후 다시 이용해주세요.');
      void signOut();
      return;
    }

    return Promise.reject(error);
  },
);

export default client;
