import { createContext, useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';

const MatchingSocketContext = createContext<{
  socket: Socket | null;
  connection?: () => Socket;
  disconnection?: () => void;
}>({
  socket: null,
});

interface MatchingSocketProviderProps {
  children: ReactNode;
}

const MatchingSocketProvider = ({ children }: MatchingSocketProviderProps) => {
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

    console.log('success socket connection');
  }, [socket]);

  return (
    <MatchingSocketContext.Provider
      value={{ socket, connection, disconnection }}
    >
      {children}
    </MatchingSocketContext.Provider>
  );
};

export const useMatchingSocket = () => {
  return useContext(MatchingSocketContext);
};

export default MatchingSocketProvider;
