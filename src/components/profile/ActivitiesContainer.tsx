import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ActivitiesCalendar } from './ActivitiesCalendar';
import { ActivityDetail } from './ActivityDetail';
import type { ChangeEventHandler } from 'react';
import type { Activity } from 'types/activity';
import { FullPageLoading } from 'components/common';
import { useActivities } from 'hooks/services';
import {
  dateStringFormat,
  getLastYearDate,
  getYearsForActivitiesCalendar,
} from 'utils';

const initialCalendarDate = {
  startDate: getLastYearDate(new Date()),
  endDate: new Date(),
  activeYear: null,
};

export const ActivitiesContainer = () => {
  const today = new Date();
  const todayDateString = dateStringFormat(today.toDateString()) as string;
  const years = getYearsForActivitiesCalendar();

  const [calendarDate, setCalendarDate] = useState<{
    startDate: Date;
    endDate: Date;
    activeYear: string | null;
  }>(initialCalendarDate);
  const [selectedDate, setSelectedDate] = useState<string>(todayDateString);

  const { data: session } = useSession({ required: true });

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const { activitiesData } = useActivities({
    username: session.user.username,
    year: calendarDate.activeYear,
  });

  const isSelected = selectedDate.length !== 0;

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;

    if (event.target.selectedIndex === 0) {
      setCalendarDate(initialCalendarDate);
      setSelectedDate(todayDateString);
      return;
    }

    const lastYear = Number(value) - 1;

    // TODO: startDate 확인 필요
    setCalendarDate({
      startDate: new Date(`${lastYear}-12-31`),
      endDate: new Date(`${value}-12-31`),
      activeYear: value,
    });
    setSelectedDate(`${value}-12-31`);
  };

  const handleClick = (value: Activity) => {
    if (value === null) return;

    const { date } = value;

    setSelectedDate(dateStringFormat(date) as string);
  };

  if (activitiesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <section>
      <ActivitiesCalendarHeader>
        <Select defaultValue={undefined} onChange={handleSelect}>
          {years.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </ActivitiesCalendarHeader>

      <ActivitiesCalendar
        activitiesData={activitiesData}
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        onClick={handleClick}
      />

      {isSelected && <ActivityDetail dateString={selectedDate} />}
    </section>
  );
};

const ActivitiesCalendarHeader = styled.header`
  padding: 0 20px 0 50px;
`;

const Select = styled.select`
  border: 0;
  ${({ theme }) => theme.fonts.body_07}
`;
