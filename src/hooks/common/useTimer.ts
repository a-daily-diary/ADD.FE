import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [totalSecond, setTotalSecond] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTotalSecond((previousSecond) => previousSecond + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const minute = Math.round(totalSecond / 60)
    .toString()
    .padStart(2, '0');

  const second = (totalSecond % 60).toString().padStart(2, '0');

  return { minute, second };
};
