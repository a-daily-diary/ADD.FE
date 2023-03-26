import styled from '@emotion/styled';
import DiaryComment from './DiaryComment';
import { ScreenReaderOnly } from 'styles/ScreenReaderStyle';

// TODO: 타입 디렉토리에 분리하기
interface CommentProps {
  id: number;
  authorUsername: string;
  authorThumbnailUrl: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

interface CommentsProps {
  comments: CommentProps[];
}

const DiaryComments = ({ comments }: CommentsProps) => {
  const commentsCount = comments.length;

  return (
    <>
      {commentsCount > 0 ? (
        <>
          <CommentTitle>{commentsCount}개의 댓글</CommentTitle>
          <ul>
            {comments.map((comment) => {
              return (
                <DiaryComment
                  key={`diary-comment-${comment.id}`}
                  comment={comment}
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
  color: ${({ theme }) => theme.colors.gray_999};
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.02em;
`;
