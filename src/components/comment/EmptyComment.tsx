import styled from '@emotion/styled';

const EmptyComment = () => {
  return (
    <EmptyContainer>
      <EmptyParagraph>
        아직 댓글이 없어요.
        <br />
        가장 먼저 댓글을 남겨보세요.
      </EmptyParagraph>
    </EmptyContainer>
  );
};

export default EmptyComment;

const EmptyContainer = styled.div`
  padding-top: 40px;
  text-align: center;
`;

const EmptyParagraph = styled.p`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_09};
  text-align: center;
`;
