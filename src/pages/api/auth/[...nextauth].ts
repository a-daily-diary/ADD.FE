import { isAxiosError } from 'axios';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import type { LoginRequest } from 'types/login';
import type { EditProfileRequest } from 'types/profile';
import type { ErrorResponse } from 'types/response';
import * as api from 'api';
import { errorResponseMessage } from 'utils';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // NOTE: 24 hours
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
              data: { user, token },
            },
          } = await api.login({ email, password });
          return { ...user, accessToken: token };
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
    async jwt({ token, account, user, trigger, session }) {
      // Oauth로 로그인할 경우 account 객체가 인수로 전달됨, 추후 수정 필요
      if (account?.access_token !== undefined) {
        // !== 연산자 사용시 사용자 정보가 제대로 넘어오지 않음
        token.accessToken = account.access_token;
        // token.id = profile.id; // profile 필요할 경우 추가
      }

      if (trigger === 'update' && session !== null) {
        const { username, imgUrl } = session as EditProfileRequest;

        token.username = username;
        token.imgUrl = imgUrl;
      }

      return await Promise.resolve({ ...token, ...user });
    },
    async session({ session, token }) {
      // jwt의 반환값 token으로 받음
      const { email, id, imgUrl, isAdmin, username, accessToken } = token;
      // session.user에 token의 로그인 한 사용자 정보 전달
      session.user = { email, id, username, imgUrl, isAdmin, accessToken };
      // session.accessToken = accessToken;

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

export default NextAuth(authOptions);
