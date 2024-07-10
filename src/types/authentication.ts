import type { Session, User } from 'next-auth';

export type Authentication =
  | {
      user: undefined;
      status: 'loading';
    }
  | {
      update: (data?: User) => Promise<Session | null>;
      user: User;
      status: 'authenticated';
    };
