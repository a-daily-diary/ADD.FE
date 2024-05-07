import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { MatchingInformation } from 'types/matching';
import { MATCHING_SOCKET_EVENT } from 'constants/matching';

export class MatchingRTC {
  public socket: Socket | null = null;

  public peer: RTCPeerConnection | null = null;

  public startMatching({
    userInformation,
    onSuccess,
  }: {
    userInformation: { id: string; username: string };
    onSuccess: (matchingInformation: MatchingInformation) => void;
  }) {
    this.socket = io('ws://localhost:5001/matching'); // FIXME: 환경변수 처리

    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ], // FIXME: 환경변수 처리
        },
      ],
    });

    this.socket.emit(
      MATCHING_SOCKET_EVENT.client.joinMatchingQueue,
      userInformation,
    );

    this.socket.on(
      MATCHING_SOCKET_EVENT.server.matchingSuccess,
      (matchingInformation: MatchingInformation) => {
        onSuccess(matchingInformation);
      },
    );
  }

  public async startSignaling(
    audioElement: HTMLAudioElement,
    matchingInformation: MatchingInformation,
  ) {
    // TODO: startMatching이 선행되어야 함. (예외처리 추가 필요)
    if (this.socket === null || this.peer === null) return;

    const { role, matchingSocket } = matchingInformation;

    this.peer.addEventListener('icecandidate', ({ candidate }) => {
      if (candidate === null) return;

      // [send event] offer <-> answer
      this.socket?.emit('ice', { matchingSocket, candidate });
    });

    this.peer.addEventListener('track', (trackEvent: RTCTrackEvent) => {
      audioElement.srcObject = trackEvent.streams[0];
    });

    if (role === 'offer') {
      const offer = await this.peer?.createOffer();

      await this.peer?.setLocalDescription(offer);

      // [send event] offer -> answer
      this.socket.emit(MATCHING_SOCKET_EVENT.client.offer, {
        answerSocket: matchingSocket,
        offer,
      });
    }

    // [received event] answer <- offer
    this.socket.on(
      MATCHING_SOCKET_EVENT.server.offer,
      async (data: { offer: RTCSessionDescriptionInit }) => {
        await this.peer?.setRemoteDescription(data.offer);

        const answer = await this.peer?.createAnswer();

        await this.peer?.setLocalDescription(answer);

        if (this.socket !== null) {
          // [send event] answer -> offer
          this.socket.emit(MATCHING_SOCKET_EVENT.client.answer, {
            offerSocket: matchingSocket,
            answer,
          });
        }
      },
    );

    // [received event] offer <- answer
    this.socket.on(
      MATCHING_SOCKET_EVENT.server.answer,
      async (data: { answer: RTCSessionDescriptionInit }) => {
        await this.peer?.setRemoteDescription(data.answer);
      },
    );

    // [received event] offer <-> answer
    this.socket.on(
      'ice',
      async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        if (this.peer?.remoteDescription === null) return;

        await this.peer?.addIceCandidate(candidate);
      },
    );
  }

  public disconnect() {
    // TODO: event handler memory 해체 로직 추가 필요(socket, peer, interval)
    this.socket?.disconnect();
    this.socket = null;

    this.peer?.close();
    this.peer = null;
  }
}
