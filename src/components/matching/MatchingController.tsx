import styled from '@emotion/styled';

import { useEffect, useRef } from 'react';
import { MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { colors } from 'constants/styles';
import { useAudioStream } from 'hooks/common/useAudioStream';
import { ScreenReaderOnly } from 'styles';

const MatchingController = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { audioStream } = useAudioStream();

  useEffect(() => {
    if (audioRef.current !== null && audioStream !== null) {
      // FIXME: 추후 WebRTC로 연동된 매칭 상대의 stream으로 대체 예정.
      audioRef.current.srcObject = audioStream;
    }
  }, [audioStream]);

  return (
    <Container>
      <SubTitle>통화 제어</SubTitle>
      <audio ref={audioRef} muted autoPlay>
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
