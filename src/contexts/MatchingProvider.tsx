import { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { Matching } from 'utils';

const MatchingContext = createContext<Matching | null>(null);

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
  const context = useContext(MatchingContext);

  if (context === null) {
    throw new Error('MatchingContext must be used within a MatchingProvider');
  }
  return context;
};

export default MatchingProvider;
