import styled from '@emotion/styled';
import Diary from './Diary';
import type { Diaries } from 'types/diary';
import { ScreenReaderOnly } from 'styles';

interface DiariesContainerProps {
  title: string;
  diariesData: Diaries[];
  empty: JSX.Element;
}

export const DiariesContainer = ({
  title,
  diariesData,
  empty,
}: DiariesContainerProps) => {
  const isEmptyDiaries = diariesData.length === 0;

  // TODO: 북마크한 일기 리스트 조회 데이터 구조 변경 완료 후 수정
  // diaries의 값이 null일 경우가 있는지 확인
  if (isEmptyDiaries) return empty;

  return (
    <section>
      <Title>{title}</Title>
      <List>
        {diariesData.map((data) => {
          const { diaries } = data;
          return diaries.map((diary) => {
            const { id } = diary;
            return <Diary key={`diary-list-${id}`} {...diary} />;
          });
        })}
      </List>
    </section>
  );
};

const Title = styled.h2`
  ${ScreenReaderOnly}
`;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
