import styled from '@emotion/styled';
import Diary from './Diary';
import type { DiaryDetail } from 'types/diary';
import { ScreenReaderOnly } from 'styles';

interface ActivityDiariesContainerProps {
  title: string;
  diariesData: DiaryDetail[];
  empty: JSX.Element;
}

export const ActivityDiariesContainer = ({
  title,
  diariesData,
  empty,
}: ActivityDiariesContainerProps) => {
  const isEmptyDiaries = diariesData.length === 0;

  if (isEmptyDiaries) return empty;

  return (
    <section>
      <Title>{title}</Title>
      <List>
        {diariesData.map((diary) => {
          const { id } = diary;
          return <Diary key={`diary-list-${id}`} {...diary} />;
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
