import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTotalSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return { minutes, seconds };
};
