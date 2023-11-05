import { useEffect, useRef, useState } from 'react';

export const useClickOutside = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    const { target } = e;
    if (target === null || ref.current === null) return;
    if (!ref.current.contains(target as HTMLElement)) {
      setIsVisible(false);
    }
  };
  return { ref, isVisible, setIsVisible };
};
