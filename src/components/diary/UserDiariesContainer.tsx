import styled from '@emotion/styled';
import Diary from './Diary';
import type { Diaries } from 'types/diary';
import EmptyDiary from 'components/diary/EmptyDiary';

interface UserDiariesContainerProps {
  diariesData: Diaries;
}

export const UserDiariesContainer = ({
  diariesData,
}: UserDiariesContainerProps) => {
  const { diaries } = diariesData;

  // TODO: 북마크한 일기 리스트 조회 데이터 구조 변경 완료 후 수정
  if (diaries === undefined || diaries.length === 0)
    return <EmptyDiary text={'일기가 없습니다.'} />;

  return (
    <List>
      {diaries.map((diary) => {
        const { id } = diary;
        return <Diary key={`diary-list-${id}`} {...diary} />;
      })}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
