import { useRouter } from 'next/router';
import DiaryDetail from 'components/diary/DiaryDetail';
import DiaryCommentsContainer from 'containers/diary/DiaryCommentsContainer';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';

const DiaryDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // TODO: API 연동하기
  const data = DIARY_LIST_MOCK_DATA[Number(id)];

  if (data === undefined) return <div>Loading...</div>;

  return (
    <>
      <section>{data !== undefined && <DiaryDetail {...data} />}</section>
      <DiaryCommentsContainer />
    </>
  );
};

export default DiaryDetailPage;
