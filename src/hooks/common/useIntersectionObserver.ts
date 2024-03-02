import { useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  onIntersect: () => void;
}

export const useIntersectionObserver = ({
  onIntersect,
  threshold = 0.5,
}: UseIntersectionObserverProps) => {
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (targetRef === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold },
    );

    observer.observe(targetRef);

    return () => {
      if (observer !== null) {
        observer.disconnect();
      }
    };
  }, [targetRef]);

  return { setTargetRef };
};
