import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ModalLayout } from 'components/layouts';

interface ModalProps {
  isVisible: boolean;
  message: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  isVisible,
  message,
  confirmText,
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ModalLayout isVisible={isVisible}>
      <Container>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancelButton type="button" onClick={onClose}>
            취소
          </CancelButton>
          <ConfirmButton type="button" onClick={onConfirm}>
            {confirmText}
          </ConfirmButton>
        </ButtonContainer>
      </Container>
    </ModalLayout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 60px;
  width: 320px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_03}
`;

const Message = styled.p`
  padding: 40px 32px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
`;

const ButtonStyle = css`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const CancelButton = styled.button`
  ${ButtonStyle}
`;

const ConfirmButton = styled.button`
  ${ButtonStyle}

  border-left: 1px solid ${({ theme }) => theme.colors.gray_06};
  color: ${({ theme }) => theme.colors.error};
`;
