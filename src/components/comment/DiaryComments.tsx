import styled from '@emotion/styled';
import { DiaryComment } from './DiaryComment';
import type { Comments } from 'types/comment';
import { ScreenReaderOnly } from 'styles';

interface DiaryCommentsProps {
  diaryComments: Comments[];
  diaryId: string;
}

export const DiaryComments = ({
  diaryComments,
  diaryId,
}: DiaryCommentsProps) => {
  const { totalCount } = diaryComments[0];
  const isEmptyComments = diaryComments.length === 0;

  if (isEmptyComments) {
    return (
      <NoCommentTitle>
        아직 댓글이 없어요.
        <br />
        가장 먼저 댓글을 남겨보세요.
      </NoCommentTitle>
    );
  }

  return (
    <>
      <CommentTitle>{totalCount}개의 댓글</CommentTitle>
      <ul>
        {diaryComments.map((data) => {
          const { comments } = data;
          return comments.map((comment) => {
            return (
              <DiaryComment
                key={`diary-comment-${comment.id}`}
                diaryComment={comment}
                diaryId={diaryId}
              />
            );
          });
        })}
      </ul>
    </>
  );
};

const CommentTitle = styled.h3`
  ${ScreenReaderOnly}
`;

const NoCommentTitle = styled.h3`
  margin: 40px 0 20px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_09};
  text-align: center;
`;
