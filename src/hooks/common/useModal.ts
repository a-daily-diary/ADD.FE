import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleModal = {
    open: () => {
      setIsVisible(true);
    },
    close: () => {
      setIsVisible(false);
    },
  };

  const preventScroll = () => {
    const currentScrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${currentScrollY}px`;

    return currentScrollY;
  };

  const allowScroll = (currentScrollY: number) => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';

    window.scrollTo(0, currentScrollY);
  };

  useEffect(() => {
    if (isVisible) {
      const currentScrollY = preventScroll();

      return () => {
        allowScroll(currentScrollY);
      };
    }
  }, [isVisible]);

  return { isVisible, handleModal };
};
