import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { AuthenticationState } from 'types/authentication';
import { PAGE_PATH } from 'constants/common';

export const useAuthenticationState = () => {
  const session = useSession();

  const router = useRouter();

  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>({
      user: undefined,
      status: 'loading',
    });

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      void router.push(PAGE_PATH.account.login);
      alert('인증이 필요한 페이지입니다.'); // FIXME: 문구 변경할 예정입니다.
      return;
    }

    if (session.status === 'authenticated') {
      setAuthenticationState({
        update: session.update,
        user: session.data.user,
        status: session.status,
      });
    }
  }, [session.status]);

  return authenticationState;
};
