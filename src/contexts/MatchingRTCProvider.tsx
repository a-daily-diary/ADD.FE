import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import type { MatchingSuccessResponse } from 'types/matching';
import { MATCHING_SOCKET_EVENT } from 'constants/matching';

const MatchingRTCContext = createContext<{
  socket: Socket | null;
  connection?: () => Socket;
  disconnection?: () => void;
}>({
  socket: null,
});

interface MatchingRTCProviderProps {
  children: ReactNode;
}

const MatchingRTCProvider = ({ children }: MatchingRTCProviderProps) => {
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);

  const connection = () => {
    const socketIo = io('ws://localhost:5001/matching');
    setSocket(socketIo);

    return socketIo;
  };

  const disconnection = () => {
    socket?.disconnect();
    setSocket(null);
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on(
      MATCHING_SOCKET_EVENT.server.matchingSuccess,
      (data: MatchingSuccessResponse) => {
        void router.push({
          pathname: '/matching/playing',
          query: {
            r: data.role,
            ms: data.matchingSocket,
            mu: data.matchingUser,
          },
        });
      },
    );
  }, [socket]);

  return (
    <MatchingRTCContext.Provider value={{ socket, connection, disconnection }}>
      {children}
    </MatchingRTCContext.Provider>
  );
};

export const useMatchingRTC = () => {
  return useContext(MatchingRTCContext);
};

export default MatchingRTCProvider;
