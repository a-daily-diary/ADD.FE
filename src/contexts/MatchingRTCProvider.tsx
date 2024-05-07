import { createContext, useContext, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { MatchingRTC } from 'utils/MatchingRTC';

const MatchingRTCContext = createContext<MatchingRTC>(new MatchingRTC());

interface MatchingRTCProviderProps {
  children: ReactNode;
}

const MatchingRTCProvider = ({ children }: MatchingRTCProviderProps) => {
  const { current: matchingRTC } = useRef<MatchingRTC>(new MatchingRTC());

  useEffect(() => {
    return () => {
      matchingRTC.disconnect();
    };
  }, []);

  return (
    <MatchingRTCContext.Provider value={matchingRTC}>
      {children}
    </MatchingRTCContext.Provider>
  );
};

export const useMatchingRTC = () => {
  return useContext(MatchingRTCContext);
};

export default MatchingRTCProvider;
