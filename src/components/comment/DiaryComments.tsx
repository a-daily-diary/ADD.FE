import styled from '@emotion/styled';
import { DiaryComment } from './DiaryComment';
import EmptyComment from './EmptyComment';
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
  const isEmptyComments = totalCount === 0;

  if (isEmptyComments) {
    return <EmptyComment />;
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
