import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string;
    imgUrl: string;
    isAdmin: boolean;
    accessToken: string;
  }
  interface Session {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string;
    imgUrl: string;
    isAdmin: boolean;
    accessToken: string;
  }
}
