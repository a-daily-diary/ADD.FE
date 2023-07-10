import styled from '@emotion/styled';
import Diary from '../../components/diary/Diary';
import { useDiaries } from 'hooks/services';

const DiariesContainer = () => {
  const { diariesData, isLoading } = useDiaries();

  if (diariesData === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const { diaries } = diariesData;
  return (
    <List>
      {diaries.map((diary) => {
        const { id } = diary;
        return <Diary key={`diary-list-${id}`} {...diary} />;
      })}
    </List>
  );
};

export default DiariesContainer;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
