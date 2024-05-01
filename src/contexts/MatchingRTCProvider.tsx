import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import type { MatchingInformation } from 'types/matching';
import { MATCHING_SOCKET_EVENT } from 'constants/matching';

const MatchingRTCContext = createContext<{
  socket: Socket | null;
  connection?: () => Socket;
  disconnection?: () => void;
  startSignaling?: (
    peerConnection: RTCPeerConnection,
    matchingInformation: MatchingInformation,
  ) => Promise<void>;
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

  const startSignaling = async (
    peerConnection: RTCPeerConnection,
    matchingInformation: MatchingInformation,
  ) => {
    if (socket === null) return;
    if (matchingInformation.role === 'offer') {
      const offer = await peerConnection.createOffer();

      await peerConnection.setLocalDescription(offer);

      socket.emit(MATCHING_SOCKET_EVENT.client.offer, {
        answerSocket: matchingInformation.matchingSocket,
        offer,
      });
    }

    socket.on(
      MATCHING_SOCKET_EVENT.server.offer,
      async (data: { offer: RTCSessionDescriptionInit }) => {
        await peerConnection.setRemoteDescription(data.offer);

        const answer = await peerConnection.createAnswer();

        await peerConnection.setLocalDescription(answer);

        socket.emit(MATCHING_SOCKET_EVENT.client.answer, {
          offerSocket: matchingInformation.matchingSocket,
          answer,
        });
      },
    );

    socket.on(
      MATCHING_SOCKET_EVENT.server.answer,
      async (data: { answer: RTCSessionDescriptionInit }) => {
        await peerConnection.setRemoteDescription(data.answer);
      },
    );

    socket.on(
      MATCHING_SOCKET_EVENT.server.ice,
      async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection.remoteDescription === null) return;
        await peerConnection.addIceCandidate(candidate);
      },
    );
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on(
      MATCHING_SOCKET_EVENT.server.matchingSuccess,
      (data: MatchingInformation) => {
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
    <MatchingRTCContext.Provider
      value={{
        socket,
        connection,
        disconnection,
        startSignaling,
      }}
    >
      {children}
    </MatchingRTCContext.Provider>
  );
};

export const useMatchingRTC = () => {
  return useContext(MatchingRTCContext);
};

export default MatchingRTCProvider;
