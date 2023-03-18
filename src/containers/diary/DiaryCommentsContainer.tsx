import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import ReplyIcon from 'assets/icons/reply.svg';
import DiaryCommentInput from 'components/diary/DiaryCommentInput';
import DiaryComments from 'components/diary/DiaryComments';
import { COMMENT_LIST_MOCK_DATA } from 'mocks/CommentList';

// TODO: 타입 디렉토리에 분리하기
interface CommentProps {
  id: number;
  authorUsername: string;
  authorThumbnailUrl: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const DiaryCommentsContainer = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    setComments(COMMENT_LIST_MOCK_DATA);
  }, []);

  return (
    <DiaryCommentSection>
      <DiaryComments comments={comments} />
      <WriteCommentLabel htmlFor="diaryCommentTextarea">
        <ReplyIcon />
        <WriteCommentSpan>댓글쓰기</WriteCommentSpan>
      </WriteCommentLabel>
      <DiaryCommentInput />
    </DiaryCommentSection>
  );
};

export default DiaryCommentsContainer;

const DiaryCommentSection = styled.section`
  margin-bottom: 92px;
  border-top: 6px solid ${({ theme }) => theme.colors.gray_eee};
`;

const WriteCommentLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 105px;
  height: 40px;
  margin: 20px auto 40px;
  border-radius: 120px;
  background-color: ${({ theme }) => theme.colors.bg_f4f4f4};
`;

const WriteCommentSpan = styled.span`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.gray_666};
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
`;
