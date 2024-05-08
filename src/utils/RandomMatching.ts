import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { MatchingInformation } from 'types/matching';
import { MATCHING_SOCKET_EVENT } from 'constants/matching';

export class RandomMatching {
  public socket: Socket | null = null;

  public peer: RTCPeerConnection | null = null;

  private audioStream: MediaStream | null = null;

  private async canUseAudio() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const audioPermissionStatus = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      const canUse = audioPermissionStatus.state !== 'denied';

      return canUse;
    } catch (error) {
      return false;
    }
  }

  public async startMatching({
    userInformation,
    onSuccess,
    onError,
  }: {
    userInformation: { id: string; username: string };
    onSuccess: (matchingInformation: MatchingInformation) => void;
    onError: (message: string) => void;
  }) {
    const canUseAudio = await this.canUseAudio();

    if (!canUseAudio) {
      onError(
        '매칭 서비스 이용을 위해 마이크 권한을 설정해주세요.\nChrome 우측 상단 더보기 > 설정 > 개인 정보 및 보안 > 사이트 설정 > 마이크에서 설정할 수 있습니다.\n\n메인 페이지로 이동합니다.',
      );
      return;
    }

    try {
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
    } catch (error) {
      console.log(error);
      onError('랜덤 매칭에 실패하였습니다.\n메인 페이지로 이동합니다.');
    }
  }

  public async startSignaling(
    audioElement: HTMLAudioElement,
    matchingInformation: MatchingInformation,
  ) {
    // TODO: startMatching이 선행되어야 함. (예외처리 추가 필요)
    if (this.socket === null || this.peer === null || this.audioStream === null)
      return;

    const { role, matchingSocket } = matchingInformation;

    this.audioStream.getTracks().forEach((track) => {
      if (this.audioStream === null) return;

      this.peer?.addTrack(track, this.audioStream);
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
        matchingSocket,
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
