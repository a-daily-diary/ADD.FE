import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { Z_INDEX } from 'constants/styles';

interface ModalLayoutProps {
  isVisible: boolean;
  children: ReactNode;
}

export const ModalLayout = ({ isVisible, children }: ModalLayoutProps) => {
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
        <ModalContent>{children}</ModalContent>
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

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
