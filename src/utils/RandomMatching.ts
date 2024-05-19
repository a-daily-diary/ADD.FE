import { io } from 'socket.io-client';
import type { User } from 'next-auth';
import type { Socket } from 'socket.io-client';
import type { MatchingInformation } from 'types/matching';
import { MATCHING_SOCKET_EVENT, EXCEPTION_MESSAGE } from 'constants/matching';

export class RandomMatching {
  public socket: Socket | null = null;

  public peer: RTCPeerConnection | null = null;

  private audioStream: MediaStream | null = null;

  private async canUseMicrophone() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const microphonePermission = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      return microphonePermission.state === 'granted';
    } catch (error) {
      return false;
    }
  }

  public async startMatching({
    user,
    onSuccess,
    onError,
  }: {
    user: Pick<User, 'id' | 'username'>;
    onSuccess: (matchingInformation: MatchingInformation) => void;
    onError: (message: string) => void;
  }) {
    const canUseMicrophone = await this.canUseMicrophone();

    if (!canUseMicrophone) {
      onError(EXCEPTION_MESSAGE.rejectMicrophone);
      return;
    }

    try {
      const matchingSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

      const stunServers = process.env.NEXT_PUBLIC_STUN_SERVERS?.split(',');

      if (matchingSocketUrl === undefined)
        throw new Error('invalid socket url');

      this.socket = io(matchingSocketUrl);

      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: stunServers ?? [],
          },
        ],
      });

      this.socket.emit(MATCHING_SOCKET_EVENT.client.joinQueue, user);

      this.socket.on(
        MATCHING_SOCKET_EVENT.server.success,
        (matchingInformation: MatchingInformation) => {
          onSuccess(matchingInformation);
        },
      );
    } catch (error) {
      console.log(error);
      onError(EXCEPTION_MESSAGE.failedMatching);
    }
  }

  public async startSignaling(
    audioElement: HTMLAudioElement,
    matchingInformation: MatchingInformation,
  ) {
    if (this.socket === null || this.peer === null || this.audioStream === null)
      throw new Error(
        '개발자 에러: startSignaling 메소드 호출 이전에 startMatching 메소드가 먼저 호출되어야 합니다.',
      );

    const { role, socketId } = matchingInformation;

    this.audioStream.getTracks().forEach((track) => {
      if (this.audioStream === null) return;

      this.peer?.addTrack(track, this.audioStream);
    });

    if (role === 'offer') {
      const offer = await this.peer?.createOffer();

      await this.peer?.setLocalDescription(offer);

      // [send event] offer -> answer
      this.socket.emit(MATCHING_SOCKET_EVENT.client.offer, {
        answerSocket: socketId,
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
            offerSocket: socketId,
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

    // [received event] offer <-> answer (complete signaling)
    this.socket.on(
      MATCHING_SOCKET_EVENT.server.ice,
      async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        await this.peer?.addIceCandidate(candidate);
      },
    );

    this.peer.onicecandidate = ({ candidate }: RTCPeerConnectionIceEvent) => {
      // [send event] offer <-> answer
      this.socket?.emit(MATCHING_SOCKET_EVENT.client.ice, {
        matchingSocket: socketId,
        candidate,
      });
    };

    this.peer.ontrack = (trackEvent: RTCTrackEvent) => {
      audioElement.srcObject = trackEvent.streams[0];
    };
  }

  public disconnect() {
    if (this.socket === null || this.peer === null || this.audioStream === null)
      return;

    this.socket.removeAllListeners(MATCHING_SOCKET_EVENT.server.offer);
    this.socket.removeAllListeners(MATCHING_SOCKET_EVENT.server.answer);
    this.socket.removeAllListeners(MATCHING_SOCKET_EVENT.server.ice);
    this.socket.disconnect();
    this.socket = null;

    this.peer.onicecandidate = null;
    this.peer.ontrack = null;
    this.peer.getSenders().forEach((sender) => {
      this.peer?.removeTrack(sender);
    });
    this.peer.close();
    this.peer = null;

    this.audioStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
