import styled from '@emotion/styled';
import { WriteCommentIcon } from 'assets/icons';
import { DiaryCommentInput, DiaryComments } from 'components/comment';
import { FullPageLoading, ObserverTarget } from 'components/common';
import { useIntersectionObserver } from 'hooks/common';
import { useComments } from 'hooks/services';

interface DiaryCommentsContainerProps {
  diaryId: string;
}

export const DiaryCommentsContainer = ({
  diaryId,
}: DiaryCommentsContainerProps) => {
  const { commentsData, isLoading, isError, fetchNextPage } =
    useComments(diaryId);
  const { setTargetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  if (commentsData === undefined) return <FullPageLoading />;

  return (
    <DiaryCommentSection>
      <DiaryComments diaryComments={commentsData} diaryId={diaryId} />
      <ObserverTarget
        targetRef={setTargetRef}
        isLoading={isLoading}
        isError={isError}
      />
      <WriteCommentLabel htmlFor="diaryCommentTextarea">
        <WriteCommentIcon />
        <WriteCommentSpan>댓글쓰기</WriteCommentSpan>
      </WriteCommentLabel>
      <DiaryCommentInput diaryId={diaryId} />
    </DiaryCommentSection>
  );
};

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
