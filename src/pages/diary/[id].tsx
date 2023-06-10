import DiaryDetail from 'components/diary/DiaryDetail';
import DiaryCommentsContainer from 'containers/diary/DiaryCommentsContainer';

const DiaryDetailPage = () => {
  return (
    <>
      <section>
        <DiaryDetail />
      </section>
      <DiaryCommentsContainer />
    </>
  );
};

export default DiaryDetailPage;
