import { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { Matching } from 'utils';

const MatchingContext = createContext<Matching>(new Matching());

interface MatchingProviderProps {
  children: ReactNode;
}

const MatchingProvider = ({ children }: MatchingProviderProps) => {
  const { current: matching } = useRef<Matching>(new Matching());

  return (
    <MatchingContext.Provider value={matching}>
      {children}
    </MatchingContext.Provider>
  );
};

export const useMatching = () => {
  return useContext(MatchingContext);
};

export default MatchingProvider;
