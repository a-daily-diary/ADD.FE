import { useEffect, useState } from 'react';
import type { MutableRefObject } from 'react';

interface IndicatorProps {
  width: number;
  offsetLeft: number;
}

interface useTabIndicatorProps {
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
  activeIndex: number;
}

const useTabIndicator = ({ tabsRef, activeIndex }: useTabIndicatorProps) => {
  const [indicator, setIndicator] = useState<IndicatorProps>({
    width: 0,
    offsetLeft: 0,
  });

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

  return indicator;
};

export default useTabIndicator;
