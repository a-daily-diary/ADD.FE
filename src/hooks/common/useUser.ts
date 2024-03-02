import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { User } from 'next-auth';

interface LoggedStatus {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const useUser = (): LoggedStatus => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'authenticated';

  const useData = session !== null ? session?.user : null;

  if (isUnauthenticated) {
    void router.push('/account/login');
  }

  return {
    user: useData,
    isLoading,
    isLoggedIn: isAuthenticated,
  };
};
