import router from 'next/router';
import { useEffect } from 'react';

interface UseBeforeLeaveProps {
  message: string;
  path: string;
}

export const useBeforeLeave = ({ message, path }: UseBeforeLeaveProps) => {
  const handleConfirm = () => {
    window.history.pushState(null, '', path);
    if (confirm(message)) return true;
    return false;
  };

  const handleBeforeunload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = '');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    router.beforePopState(() => handleConfirm());

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      router.beforePopState(() => true);
    };
  }, [handleBeforeunload, handleConfirm]);
};
