import Diary from './Diary';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';

const DiaryList = () => {
  return (
    <section>
      <ul>
        {DIARY_LIST_MOCK_DATA.map((diary) => {
          return <Diary key={`diary-list-${diary.id}`} {...diary} />;
        })}
      </ul>
    </section>
  );
};

export default DiaryList;
