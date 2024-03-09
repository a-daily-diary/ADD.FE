import styled from '@emotion/styled';

const EmptyComment = () => {
  return (
    <Title>
      아직 댓글이 없어요.
      <br />
      가장 먼저 댓글을 남겨보세요.
    </Title>
  );
};

export default EmptyComment;

const Title = styled.h3`
  padding-top: 40px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_09};
  text-align: center;
`;
