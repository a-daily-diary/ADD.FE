import styled from '@emotion/styled';
import Diary from './Diary';
import type { Diaries } from 'types/diary';
import { ScreenReaderOnly } from 'styles';

interface DiariesContainerProps {
  title: string;
  diariesData: Diaries[];
  empty: JSX.Element;
  header?: JSX.Element;
  page?: 'main' | 'search';
}

export const DiariesContainer = ({
  title,
  diariesData,
  empty,
  header,
  page = 'main',
}: DiariesContainerProps) => {
  const { totalCount } = diariesData[0];
  const isEmptyDiaries = totalCount === 0;

  if (isEmptyDiaries) return empty;

  return (
    <section>
      <Title>{title}</Title>
      {page === 'search' && header}
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
