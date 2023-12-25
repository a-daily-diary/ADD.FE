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

  const handleRouteChange = () => {
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath);
    }

    // NOTE: route가 변경되기 전 실행할 함수
    beforeLeaveCallback();

    // NOTE: 뒤로가기 이벤트 실행을 막기 위한 코드
    router.events.emit('routeChangeError');
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw undefined;
  };

  const handleRouterBack = () => {
    router.events.off('routeChangeStart', handleRouteChange);
    router.back();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [handleBeforeunload, handleRouteChange]);

  return { handleRouterBack };
};
