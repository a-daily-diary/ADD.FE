import styled from '@emotion/styled';
import Image from 'next/image';
import type { Badge } from 'types/badges';
import { AlertModal } from 'components/common';
import { useModal } from 'hooks/common';

interface BadgeDetailButtonProps {
  badge: Badge;
}

export const BadgeDetailButton = ({ badge }: BadgeDetailButtonProps) => {
  const { imgUrl, name, description } = badge;

  const { isVisible, handleModal } = useModal();

  const handleOpenBadgeDetail = () => {
    handleModal.open();
  };

  const handleCloseBadgeDetail = () => {
    handleModal.close();
  };

  return (
    <>
      <Container type="button" onClick={handleOpenBadgeDetail}>
        <Image src={imgUrl} alt={description} width={80} height={80} priority />
        <span>{name}</span>
      </Container>

      <AlertModal isVisible={isVisible} onClose={handleCloseBadgeDetail}>
        <ModalContent>
          <Image
            src={imgUrl}
            alt={description}
            width={80}
            height={80}
            priority
          />
          <BadgeName>{name}</BadgeName>
          <BadgeDescription>{description}</BadgeDescription>
        </ModalContent>
      </AlertModal>
    </>
  );
};

const Container = styled.button`
  display: grid;
  grid-template-rows: 80px;
  place-items: center;
  gap: 10px;
  ${({ theme }) => theme.fonts.body_08};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 32px 30px;
`;

const BadgeName = styled.strong`
  margin: 16px 0 2px;
  ${({ theme }) => theme.fonts.headline_04};
`;

const BadgeDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_01};
  ${({ theme }) => theme.fonts.body_07};
`;
