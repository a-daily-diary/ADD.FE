import styled from '@emotion/styled';
import Image from 'next/image';

interface NoSearchResultsProps {
  description: string;
}

export const NoSearchResults = ({ description }: NoSearchResultsProps) => {
  return (
    <Container>
      <Image
        src={'/images/search/search_empty.png'}
        alt={description}
        width={100}
        height={100}
        priority
      />
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 44px 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_05}
`;
