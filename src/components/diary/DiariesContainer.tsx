import styled from '@emotion/styled';
import Diary from './Diary';
import type { ReactNode } from 'react';
import type { Diaries } from 'types/diary';
import { ScreenReaderOnly } from 'styles';

interface DiariesContainerProps {
  title: string;
  diariesData: Diaries;
  empty?: ReactNode;
}

export const DiariesContainer = ({
  title,
  diariesData,
  empty,
}: DiariesContainerProps) => {
  const { diaries } = diariesData;

  // TODO: 북마크한 일기 리스트 조회 데이터 구조 변경 완료 후 수정
  // diaries의 값이 null일 경우가 있는지 확인
  if (diaries === undefined || diaries.length === 0) {
    return <>{empty}</>;
  }

  return (
    <article>
      <Title>{title}</Title>
      <List>
        {diaries.map((diary) => {
          const { id } = diary;
          return <Diary key={`diary-list-${id}`} {...diary} />;
        })}
      </List>
    </article>
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
