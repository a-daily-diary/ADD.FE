export const debounce = <T = any>(
  callback: (args: T) => void,
  delay = 500,
): typeof callback => {
  let timer: NodeJS.Timeout | null;

  return (args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;

      callback(args);
    }, delay);
  };
};
