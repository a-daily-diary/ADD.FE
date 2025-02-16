import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { MatchingInformation } from 'types/matching';
import { MicrophoneOnIcon, MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { ConfirmModal, IconButton } from 'components/common';
import { PAGE_PATH } from 'constants/common';
import { MODAL_BUTTON, MODAL_MESSAGE } from 'constants/modal';
import { colors } from 'constants/styles';
import { useMatching } from 'contexts/MatchingProvider';
import { useModal } from 'hooks/common';
import { useAlert } from 'hooks/common/useAlert';
import { ScreenReaderOnly } from 'styles';

const MatchingController = () => {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isEnabledMicrophone, setIsEnabledMicrophone] =
    useState<boolean>(false);

  const matching = useMatching();

  const { action: alertAction, Alert } = useAlert(() => {
    void router.replace(PAGE_PATH.main);
  });

  const { isVisible: isConfirmVisible, handleModal: handleConfirmModal } =
    useModal();

  const signaling = async () => {
    const { query } = router;

    const { current: audioElement } = audioRef;

    if (audioElement === null) return;

    try {
      await matching.signaling(audioElement, {
        role: query.r as MatchingInformation['role'],
        socketId: query.ms as MatchingInformation['socketId'],
        userId: query.mu as MatchingInformation['userId'], // FIXME: username으로 변경 필요
      });
    } catch (error) {
      console.log(error);
      alertAction(
        '의도하지 않은 에러가 발생했습니다.\n메인 페이지도 이동합니다.',
      );
    }
  };

  useEffect(() => {
    void signaling();

    matching.addPeerEventHandler({
      handleDisconnected: handleEndMatching,
    });

    return () => {
      matching.disconnect();
    };
  }, []);

  const handleEndMatching = () => {
    matching.disconnect();
    void router.replace(PAGE_PATH.matching.survey);
  };

  const handleToggleMicrophone = () => {
    const isEnabledMicrophone = matching.toggleMicrophone();
    setIsEnabledMicrophone(isEnabledMicrophone);
  };

  return (
    <>
      <Container>
        <SubTitle>통화 제어</SubTitle>
        <audio ref={audioRef} muted={false} autoPlay>
          <track kind="captions" />
        </audio>
        <ButtonWrapper>
          {!isEnabledMicrophone && <Tooltip>마이크를 켜주세요!</Tooltip>}
          <IconButton
            id="microphone"
            backgroundColor={colors.bg_02}
            icon={
              isEnabledMicrophone ? <MicrophoneOnIcon /> : <MicrophoneOffIcon />
            }
            onClick={handleToggleMicrophone}
          />
          <label htmlFor="microphone">
            {isEnabledMicrophone ? '마이크 on' : '마이크 off'}
          </label>
        </ButtonWrapper>
        <ButtonWrapper>
          <IconButton
            id="end-call"
            backgroundColor={colors.red}
            icon={<EndCallIcon />}
            onClick={handleConfirmModal.open}
          />
          <label htmlFor="end-call">통화 종료</label>
        </ButtonWrapper>
      </Container>
      {Alert}
      <ConfirmModal
        isVisible={isConfirmVisible}
        message={MODAL_MESSAGE.endMatching}
        confirmText={MODAL_BUTTON.end}
        onClose={handleConfirmModal.close}
        onConfirm={handleEndMatching}
      />
    </>
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

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tooltip = styled.div`
  ${({ theme }) => theme.fonts.button_02}
  position: absolute;
  top: -47px;
  left: 50%;
  transform: translateX(-50%);
  width: 144px;
  background-color: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 11px 0;
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
