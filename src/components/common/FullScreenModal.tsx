import styled from '@emotion/styled';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Header, HeaderLeft } from 'components/layouts';
import { FadeInAnimationStyle } from 'styles';

interface FullScreenModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const FullScreenModal = ({
  children,
  onClose,
}: FullScreenModalProps) => {
  const [modalElement, setModalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    setModalElement(modalRoot);
  }, []);

  if (modalElement === null) return null;

  return createPortal(
    <ModalLayout>
      <Header left={<HeaderLeft type="이전" onClick={onClose} />} />
      <Container>{children}</Container>
    </ModalLayout>,
    modalElement,
  );
};

const ModalLayout = styled.div`
  ${FadeInAnimationStyle}
  background-color: ${({ theme }) => theme.colors.white};
  position: fixed;
  inset: 0;
  z-index: 110;
  overflow: auto;
`;

const Container = styled.div`
  margin-top: 54px;
  padding: 28px 20px;
`;
