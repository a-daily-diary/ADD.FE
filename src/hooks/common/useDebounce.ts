import { useCallback, useRef } from 'react';

export const useDebounce = <T = any>(
  callback: (args: T) => void,
  delay = 500,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (args: T) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;

        callback(args);
      }, delay);
    },
    [callback, delay],
  );
};
