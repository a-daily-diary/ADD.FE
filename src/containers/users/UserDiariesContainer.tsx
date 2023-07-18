import styled from '@emotion/styled';
import Diary from '../../components/diary/Diary';
import Empty from 'components/profile/Empty';
import { useUserDiaries } from 'hooks/services';

interface UserDiariesContainerProps {
  username: string;
}

const UserDiariesContainer = ({ username }: UserDiariesContainerProps) => {
  const { userDiariesData, isLoading } = useUserDiaries(username);

  if (userDiariesData === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const { diaries } = userDiariesData;

  if (diaries.length === 0) return <Empty text={'일기가 없습니다.'} />;

  return (
    <List>
      {diaries.map((diary) => {
        const { id } = diary;
        return <Diary key={`diary-list-${id}`} {...diary} />;
      })}
    </List>
  );
};

export default UserDiariesContainer;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
