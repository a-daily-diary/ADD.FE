import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { useModal } from './useModal';
import { AlertModal } from 'components/common';

/**
 * 1. closeCallback 함수로 해당 alert이 닫힐 때 이벤트를 등록할 수 있습니다.
 * 2. 커스텀훅 실행 후 반환되는 Alert 컴포넌트를 tsx에 넣어줍니다.
 * 3. action 함수를 실행하여 alert 컴포넌트를 화면에 렌더링합니다.
 *     - action 함수의 message 인수에 \n 문자열을 기준으로 줄바꿈을 합니다.
 */
export const useAlert = (closeCallback?: () => void) => {
  const { isVisible, handleModal } = useModal();
  const [messageLines, setMessageLines] = useState<string[]>([]);

  const action = (message: string) => {
    // NOTE: message에 줄바꿈을 위해 이스케이프 문자를 기준으로 배열로 변경합니다.
    setMessageLines(message.split('\n'));

    handleModal.open();
  };

  const handleCloseAlert = () => {
    handleModal.close();
    if (closeCallback) closeCallback();
  };

  const Alert = (
    <AlertModal isVisible={isVisible} onClose={handleCloseAlert}>
      <ModalContent>
        <p>
          {messageLines.map((message, index) => {
            const key = `message-${index}`;
            const isLast = messageLines.length - 1 === index;
            return (
              <Fragment key={key}>
                {message}
                {!isLast && <br />}
              </Fragment>
            );
          })}
        </p>
      </ModalContent>
    </AlertModal>
  );

  return {
    action,
    Alert,
  };
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 40px 32px 30px;
`;
