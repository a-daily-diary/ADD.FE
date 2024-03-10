import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Button } from 'components/common';
import { PAGE_PATH } from 'constants/page';

export const EmptyActivitiesDiary = () => {
  const router = useRouter();

  const handleGoToWriteDiary = () => {
    void router.push(PAGE_PATH.diary);
  };

  return (
    <EmptyContainer>
      <EmptyTextContainer>
        <p>일기가 없습니다.</p>
        <p>오늘 일기를 작성해보세요.</p>
      </EmptyTextContainer>
      <Button
        text="일기 작성하러 가기"
        size="sm"
        onClick={handleGoToWriteDiary}
      />
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const EmptyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_08};
`;
