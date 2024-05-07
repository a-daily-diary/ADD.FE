import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import type { MatchingInformation } from 'types/matching';
import { MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { colors } from 'constants/styles';
import { useMatchingRTC } from 'contexts/MatchingRTCProvider';
import { useAudioStream } from 'hooks/common/useAudioStream';
import { ScreenReaderOnly } from 'styles';

const MatchingController = () => {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);

  const { audioStream } = useAudioStream();

  const matchingRTC = useMatchingRTC();

  useEffect(() => {
    const { current: audioElement } = audioRef;

    if (audioElement === null || audioStream === null) return;

    const { query } = router;

    audioStream
      .getTracks()
      .forEach((track) => matchingRTC.peer?.addTrack(track, audioStream));

    void matchingRTC.startSignaling(audioElement, {
      role: query.r as MatchingInformation['role'],
      matchingSocket: query.ms as MatchingInformation['matchingSocket'],
      matchingUser: query.mu as MatchingInformation['matchingUser'],
    });
  }, [audioStream]);

  return (
    <Container>
      <SubTitle>통화 제어</SubTitle>
      <audio ref={audioRef} muted={false} autoPlay>
        <track kind="captions" />
      </audio>
      <CircleButton type="button" backgroundColor={colors.bg_02}>
        <Tooltip>마이크를 켜주세요!</Tooltip>
        <MicrophoneOffIcon />
        <span>마이크 off</span>
      </CircleButton>
      <CircleButton type="button" backgroundColor={colors.red}>
        <EndCallIcon />
        <span>통화 종료</span>
      </CircleButton>
    </Container>
  );
};

export default MatchingController;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const Container = styled.article`
  display: flex;
  justify-content: space-around;
  margin: 53px 0 30px;
`;

const CircleButton = styled.button<{
  backgroundColor: string;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundColor};
  span {
    ${({ theme }) => theme.fonts.body_07}
    position: absolute;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    color: ${({ theme }) => theme.colors.gray_00};
  }
`;

const Tooltip = styled.div`
  ${({ theme }) => theme.fonts.button_02}
  position: absolute;
  top: -46px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  background-color: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 10px 20px;
  &::before {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.primary_00};
  }
`;
