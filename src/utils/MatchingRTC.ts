import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { MatchingInformation } from 'types/matching';
import { MATCHING_SOCKET_EVENT } from 'constants/matching';

export class MatchingRTC {
  public socket: Socket | null = null;

  public peer: RTCPeerConnection | null = null;

  private audioStream: MediaStream | null = null;

  private async getAudioStream() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const audioPermissionStatus = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      if (audioPermissionStatus.state === 'denied') {
        // FIXME: 메인 페이지 이동 로직 추가 필요
        alert('해당 서비스 사용을 위해선 마이크 권한을 허용해야합니다.');
        return false;
      }

      return true;
    } catch (error) {
      // FIXME: 메인 페이지로 이동
      console.log(error);

      return false;
    }
  }

  public async startMatching({
    userInformation,
    onSuccess,
  }: {
    userInformation: { id: string; username: string };
    onSuccess: (matchingInformation: MatchingInformation) => void;
  }) {
    const canUseAudio = await this.getAudioStream();

    if (canUseAudio) {
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
    // TODO: event handler memory 해체 로직 추가 필요(socket, peer, interval)
    this.socket?.disconnect();
    this.socket = null;

    this.peer?.close();
    this.peer = null;
  }
}
