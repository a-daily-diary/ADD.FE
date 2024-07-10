import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { Authentication } from 'types/authentication';
import { PAGE_PATH } from 'constants/common';

export const useAuthentication = () => {
  const router = useRouter();

  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      void router.replace(PAGE_PATH.account.login);
      alert('인증이 필요한 페이지입니다.'); // FIXME: 문구 변경 예정입니다.
    },
  });

  const [authentication, setAuthentication] = useState<Authentication>({
    user: undefined,
    status: 'loading',
  });

  useEffect(() => {
    if (session.status === 'loading') return;

    setAuthentication({
      update: session.update,
      user: session.data.user,
      status: 'authenticated',
    });
  }, [session.status]);

  return authentication;
};
