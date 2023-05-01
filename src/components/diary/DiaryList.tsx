import styled from '@emotion/styled';
import Diary from './Diary';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';

const DiaryList = () => {
  return (
    <section>
      <Container>
        {DIARY_LIST_MOCK_DATA.map((diary) => {
          return <Diary key={`diary-list-${diary.id}`} {...diary} />;
        })}
      </Container>
    </section>
  );
};

export default DiaryList;

const Container = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
