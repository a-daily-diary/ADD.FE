import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Diary from './Diary';
import * as api from 'api';

const DiaryList = () => {
  const { data, isLoading } = useQuery(
    ['diaries'],
    async () => await api.getDiaries(),
  );

  if (data === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const { diaries } = data;
  return (
    <section>
      <List>
        {diaries.map((diary) => {
          const { id } = diary;
          return <Diary key={`diary-list-${id}`} {...diary} />;
        })}
      </List>
    </section>
  );
};

export default DiaryList;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
