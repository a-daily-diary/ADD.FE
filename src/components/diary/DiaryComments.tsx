import styled from '@emotion/styled';
import DiaryComment from './DiaryComment';
import type { Comments } from 'types/Comment';
import { ScreenReaderOnly } from 'styles';

const DiaryComments = ({ comments, totalCount }: Comments) => {
  return (
    <>
      {totalCount > 0 ? (
        <>
          <CommentTitle>{totalCount}개의 댓글</CommentTitle>
          <ul>
            {comments.map((comment) => {
              return (
                <DiaryComment
                  key={`diary-comment-${comment.id}`}
                  {...comment}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <NoCommentTitle>
          아직 댓글이 없어요.
          <br />
          가장 먼저 댓글을 남겨보세요.
        </NoCommentTitle>
      )}
    </>
  );
};

export default DiaryComments;

const CommentTitle = styled.h3`
  ${ScreenReaderOnly}
`;

const NoCommentTitle = styled.h3`
  margin: 40px 0 20px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_09};
  text-align: center;
`;
