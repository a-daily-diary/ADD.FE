import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [totalSecond, setTotalSecond] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTotalSecond((previousSecond) => previousSecond + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const minute = Math.floor(totalSecond / 60)
    .toString()
    .padStart(2, '0');

  const second = (totalSecond % 60).toString().padStart(2, '0');

  return { minute, second };
};
