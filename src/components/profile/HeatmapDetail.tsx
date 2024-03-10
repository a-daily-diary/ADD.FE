import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import Diary from 'components/diary/Diary';
import { EmptyActivitiesDiary } from 'components/diary/EmptyActivitiesDiary';
import { useHeatmapDetail } from 'hooks/services/queries';
import { dateWithDayFormat } from 'utils';

interface HeatmapDetailProps {
  dateString: string;
}

export const HeatmapDetail = ({ dateString }: HeatmapDetailProps) => {
  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const { heatmapDetailData } = useHeatmapDetail({
    username: session.user.username,
    dateString,
  });

  if (heatmapDetailData === undefined) return <div>로딩중</div>;

  const {
    date: heatmapDetailDate,
    activities: { commentCount, diaryCount, randomMatchingCount, diaries },
  } = heatmapDetailData;
  const isEmptyDiary = diaries.length === 0;

  return (
    <>
      <DetailHeader>
        <DateText>{dateWithDayFormat(heatmapDetailDate)}</DateText>
        <CountList>
          <li>
            <span>랜덤 매칭 통화 </span>
            <Count>{`${randomMatchingCount ?? 0}회`}</Count>
          </li>
          <li>
            <span>댓글 달기 </span>
            <Count>{`${commentCount ?? 0}회`}</Count>
          </li>
          <li>
            <span>일기 작성 </span>
            <Count>{`${diaryCount ?? 0}회`}</Count>
          </li>
        </CountList>
      </DetailHeader>

      {/* TODO: activities.diaries 데이터 구조 변경 후 DiariesContainer 적용 */}
      {isEmptyDiary ? (
        <EmptyActivitiesDiary />
      ) : (
        <List>
          {diaries.map((diary) => {
            const { id } = diary;
            // TODO: 데이터 구조 변경 필요
            return <Diary key={`diary-list-${id}`} {...diary} />;
          })}
        </List>
      )}
    </>
  );
};

const DetailHeader = styled.header`
  padding: 0 20px;
`;

const DateText = styled.p`
  margin-top: 32px;
  ${({ theme }) => theme.fonts.headline_05}
`;

const CountList = styled.ul`
  display: flex;
  gap: 18px;
  padding: 14px 0 12px;
  ${({ theme }) => theme.fonts.caption_02}
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
`;

const Count = styled.strong`
  font-weight: 700;
`;

const List = styled.ul`
  display: grid;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.gray_06};
`;
