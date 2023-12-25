import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Z_INDEX } from 'constants/styles';

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
  const [modalElement, setModalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    setModalElement(modalRoot);
  }, []);

  if (modalElement === null) return null;

  return createPortal(
    isVisible ? (
      <Layout>
        <Overlay />
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
      </Layout>
    ) : null,
    modalElement,
  );
};

const Layout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.modal};
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 60%;
`;

const Container = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 320px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_03}
  transform: translate(-50%, -50%);
`;

const Message = styled.p`
  padding: 40px 32px;
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
