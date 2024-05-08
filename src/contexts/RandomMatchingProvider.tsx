import { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { RandomMatching } from 'utils';

const RandomMatchingContext = createContext<RandomMatching>(
  new RandomMatching(),
);

interface RandomMatchingProviderProps {
  children: ReactNode;
}

const RandomMatchingProvider = ({ children }: RandomMatchingProviderProps) => {
  const { current: randomMatching } = useRef<RandomMatching>(
    new RandomMatching(),
  );

  return (
    <RandomMatchingContext.Provider value={randomMatching}>
      {children}
    </RandomMatchingContext.Provider>
  );
};

export const useRandomMatching = () => {
  return useContext(RandomMatchingContext);
};

export default RandomMatchingProvider;
