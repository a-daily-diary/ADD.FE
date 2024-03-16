import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import { Loading } from 'components/common';
import { ActivityDiariesContainer } from 'components/diary';
import { EmptyActivitiesDiary } from 'components/diary/EmptyActivitiesDiary';
import { useActivityDetail } from 'hooks/services/queries';
import { dateWithDayFormat } from 'utils';

interface ActivityDetailProps {
  dateString: string;
}

export const ActivityDetail = ({ dateString }: ActivityDetailProps) => {
  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const { activityDetailData } = useActivityDetail({
    username: session.user.username,
    dateString,
  });

  if (activityDetailData === undefined) return <Loading />;

  const {
    date: activityDetailDate,
    activities: { commentCount, diaryCount, randomMatchingCount, diaries },
  } = activityDetailData;

  return (
    <>
      <DetailHeader>
        <DateText>{dateWithDayFormat(activityDetailDate)}</DateText>
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

      <ActivityDiariesContainer
        title={`${dateString} 작성한 일기`}
        diariesData={diaries}
        empty={<EmptyActivitiesDiary />}
      />
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
