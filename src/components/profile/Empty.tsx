import styled from '@emotion/styled';
import Image from 'next/image';

interface EmptyProps {
  text: string;
}

const Empty = ({ text }: EmptyProps) => {
  return (
    <EmptyContainer>
      <Image
        src={'/images/profile/empty.png'}
        alt={text}
        width={100}
        height={100}
      />
      <EmptyParagraph>{text}</EmptyParagraph>
    </EmptyContainer>
  );
};

export default Empty;

const EmptyContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const EmptyParagraph = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.gray_999};
  ${({ theme }) => theme.fonts.body_08};
`;
