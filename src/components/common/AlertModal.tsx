import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { ModalLayout } from 'components/layouts';

interface AlertModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const AlertModal = ({
  isVisible,
  children,
  onClose,
}: AlertModalProps) => {
  return (
    <ModalLayout isVisible={isVisible}>
      <Container>
        {children}
        <ConfirmButton type="button" onClick={onClose}>
          확인
        </ConfirmButton>
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
`;

const ConfirmButton = styled.button`
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
  ${({ theme }) => theme.fonts.body_03};
`;
