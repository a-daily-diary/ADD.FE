import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { WriteCommentIcon } from 'assets/icons';
import DiaryCommentInput from 'components/diary/DiaryCommentInput';
import DiaryComments from 'components/diary/DiaryComments';

interface DiaryCommentsContainerProps {
  diaryId: string;
}

const DiaryCommentsContainer = ({ diaryId }: DiaryCommentsContainerProps) => {
  const { data } = useQuery(
    ['comments', diaryId],
    async () => await api.getComments(diaryId),
  );

  if (data === undefined) return <div />;

  return (
    <DiaryCommentSection>
      <DiaryComments diaryComments={data} diaryId={diaryId} />
      <WriteCommentLabel htmlFor="diaryCommentTextarea">
        <WriteCommentIcon />
        <WriteCommentSpan>댓글쓰기</WriteCommentSpan>
      </WriteCommentLabel>
      <DiaryCommentInput diaryId={diaryId} />
    </DiaryCommentSection>
  );
};

export default DiaryCommentsContainer;

const DiaryCommentSection = styled.section`
  margin-bottom: 92px;
  border-top: 6px solid ${({ theme }) => theme.colors.gray_06};
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
  background-color: ${({ theme }) => theme.colors.bg_02};
`;

const WriteCommentSpan = styled.span`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.gray_01};
  ${({ theme }) => theme.fonts.button_01};
`;
