import styled from '@emotion/styled';

import type { NextPage } from 'next';
import { ConfirmModal, Seo } from 'components/common';
import MatchingController from 'components/matching/MatchingController';
import MatchingUserInfo from 'components/matching/MatchingUserInfo';
import RecommendTopic from 'components/matching/RecommendTopic';
import { MODAL_BUTTON, MODAL_MESSAGE } from 'constants/modal';
import { useBeforeLeave, useModal } from 'hooks/common';
import { ScreenReaderOnly } from 'styles';

const MatchingPlaying: NextPage = () => {
  const {
    isVisible: isVisibleBeforeLeave,
    handleModal: handleBeforeLeaveModal,
  } = useModal();

  const { handleRouterBack } = useBeforeLeave({
    beforeLeaveCallback: handleBeforeLeaveModal.open,
  });

  return (
    <>
      <Seo title="랜덤 매칭 | a daily diary" />
      <Section>
        <Title>랜덤 매칭</Title>
        <MatchingUserInfo />
        <RecommendTopic />
        <MatchingController />
      </Section>
      <ConfirmModal
        isVisible={isVisibleBeforeLeave}
        message={MODAL_MESSAGE.leaveMatching}
        confirmText={MODAL_BUTTON.leave}
        onClose={handleBeforeLeaveModal.close}
        onConfirm={handleRouterBack}
      />
    </>
  );
};

export default MatchingPlaying;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Section = styled.section`
  text-align: center;
  padding: 0 20px;
`;
