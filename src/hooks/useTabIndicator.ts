import { useEffect, useRef, useState } from 'react';

interface Indicator {
  width: number;
  offsetLeft: number;
}

const useTabIndicator = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicator, setIndicator] = useState<Indicator>({
    width: 0,
    offsetLeft: 0,
  });
  const tabsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const setIndicatorPosition = () => {
      const currentTab = tabsRef.current[activeIndex];
      setIndicator({
        width: currentTab?.clientWidth ?? 0,
        offsetLeft: currentTab?.offsetLeft ?? 0,
      });
    };

    setIndicatorPosition();
    window.addEventListener('resize', setIndicatorPosition);

    return () => {
      window.removeEventListener('resize', setIndicatorPosition);
    };
  }, [activeIndex]);

  return { tabsRef, indicator, activeIndex, setActiveIndex };
};

export default useTabIndicator;
