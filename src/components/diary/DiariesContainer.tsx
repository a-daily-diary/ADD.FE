import styled from '@emotion/styled';
import Diary from './Diary';
import type { Diaries } from 'types/diary';
import { ScreenReaderOnly } from 'styles';

interface DiariesContainerProps {
  title: string;
  diariesData: Diaries[];
  empty: JSX.Element;
  page?: 'main' | 'search';
}

export const DiariesContainer = ({
  title,
  diariesData,
  empty,
  page = 'main',
}: DiariesContainerProps) => {
  const { totalCount } = diariesData[0];
  const isEmptyDiaries = totalCount === 0;

  if (isEmptyDiaries) return empty;

  return (
    <section>
      <Title>{title}</Title>
      {page === 'search' && (
        <SearchResultHeader>
          <TotalCountText>{`총 ${totalCount}건`}</TotalCountText>
          {/* TODO: 정렬 기능 추가 */}
        </SearchResultHeader>
      )}
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

const SearchResultHeader = styled.div`
  padding: 26px 20px 6px;
`;

const TotalCountText = styled.span`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_08}
`;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
