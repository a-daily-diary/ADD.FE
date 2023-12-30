import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface UseBeforeLeaveProps {
  beforeLeaveCallback: () => void;
}

export const useBeforeLeave = ({
  beforeLeaveCallback,
}: UseBeforeLeaveProps) => {
  const router = useRouter();

  const handleBeforeunload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = '');
  };

  const handleBeforePopstate = (as: string) => {
    if (router.asPath !== as) {
      window.history.pushState(null, '', router.asPath);

      void router.push(router.asPath);

      beforeLeaveCallback();

      return false;
    }

    return true;
  };

  const handleRouterBack = () => {
    router.beforePopState(() => true);
    router.back();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    router.beforePopState(({ as }) => handleBeforePopstate(as));

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      router.beforePopState(() => true);
    };
  }, [handleBeforeunload, handleBeforePopstate]);

  return { handleRouterBack };
};
