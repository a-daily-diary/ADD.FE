import { isAxiosError } from 'axios';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import type { LoginRequest } from 'types/Login';
import type { ErrorResponse } from 'types/Response';
import { errorResponseMessage } from 'utils';
import * as api from 'api'

export const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // email, password를 이용한 인증 방식
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      // 로그인 인증
      async authorize(credentials, _req) {
        const { email, password } = credentials as LoginRequest;

        try {
          const {
            data: {
              data: { user },
            },
          } = await api.login({email, password })
          return user;
        } catch (error) {
          if (isAxiosError<ErrorResponse>(error)) {
            throw new Error(errorResponseMessage(error.response?.data.message));
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Oauth로 로그인할 경우 account 객체가 인수로 전달됨, 추후 수정 필요
      if (account != null) {
        // !== 연산자 사용시 사용자 정보가 제대로 넘어오지 않음
        token.accessToken = account.access_token;
        // token.id = profile.id; // profile 필요할 경우 추가
      }

      return await Promise.resolve({ ...token, ...user });
    },
    async session({ session, token }) {
      // jwt의 반환값 token으로 받음
      const { email, id, imgUrl, isAdmin, username } = token;
      // session.user에 token의 로그인 한 사용자 정보 전달
      session.user = { email, id, username, imgUrl, isAdmin };

      return await Promise.resolve(session);
    },
    async signIn({ user }) {
      return await Promise.resolve(true);
    },
  },
  pages: {
    // 커스텀 로그인 페이지로 라우팅 처리
    signIn: '/account/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOption);
