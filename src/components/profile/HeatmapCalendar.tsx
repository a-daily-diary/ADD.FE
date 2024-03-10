import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { HeatmapDetail } from './HeatmapDetail';
import type { HeatmapCell } from 'types/heatmap';
import { DAY_OF_WEEK } from 'constants/common';
import { HEATMAP_WIDTH } from 'constants/styles';
import { getLastYearDate, dateStringFormat } from 'utils';

interface HeatmapCalendarProps {
  heatmapCalendarData: HeatmapCell[];
}

export const HeatmapCalendar = ({
  heatmapCalendarData,
}: HeatmapCalendarProps) => {
  const today = new Date();
  const todayString = today.toDateString();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    dateStringFormat(todayString) as string,
  );

  const getClassForValue = (value: HeatmapCell) => {
    if (value === null) return;
    const { activityCount } = value;

    switch (true) {
      case activityCount > 4:
        return 'color-step-3';
      case activityCount > 2:
        return 'color-step-2';
      case activityCount > 0:
        return 'color-step-1';
      default:
        return 'color-step-0';
    }
  };

  const handleClick = (value: HeatmapCell) => {
    const { date } = value;

    setSelectedDate(dateStringFormat(date) as string);
  };

  useEffect(() => {
    if (boxRef?.current !== null) {
      boxRef.current.scrollTo({ left: HEATMAP_WIDTH });
    }

    setSelectedDate(dateStringFormat(todayString) as string);
  }, []);

  return (
    <section>
      <Contents ref={boxRef}>
        <WeekdayList>
          {DAY_OF_WEEK.short.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </WeekdayList>

        <CalendarContainer>
          <CalendarHeatmap
            gutterSize={1}
            startDate={getLastYearDate(today)}
            endDate={today}
            values={heatmapCalendarData}
            classForValue={(value: HeatmapCell) => getClassForValue(value)}
            onClick={(value: HeatmapCell) => {
              handleClick(value);
            }}
          />
        </CalendarContainer>
      </Contents>

      <HeatmapDetail dateString={selectedDate} />
    </section>
  );
};

const Contents = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 28px auto;
  gap: 2px;
  margin: 0 20px;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const WeekdayList = styled.ul`
  display: grid;
  grid-template-rows: repeat(7, 26.2px);
  row-gap: 2.5px;
  align-content: end;
  position: sticky;
  left: 0;
  bottom: 0;
  padding-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 26px;
`;

const CalendarContainer = styled.div`
  width: ${HEATMAP_WIDTH}px;
  height: 240px;

  & .react-calendar-heatmap .react-calendar-heatmap-all-weeks {
    transform: translate(0, 13px);
  }

  & .react-calendar-heatmap text {
    font-family: pretendard;
    font-size: 5.5px;
  }

  & .react-calendar-heatmap rect {
    rx: 1px;
  }

  & .react-calendar-heatmap rect:hover {
    border-radius: 0.5px;
    outline: 1px solid ${({ theme }) => theme.colors.pink};
    outline-offset: -1px;
  }

  & .react-calendar-heatmap .color-step-0 {
    fill: ${({ theme }) => theme.colors.gray_06};
  }
  & .react-calendar-heatmap .color-step-1 {
    fill: ${({ theme }) => theme.colors.primary_02};
  }
  & .react-calendar-heatmap .color-step-2 {
    fill: ${({ theme }) => theme.colors.primary_01};
  }
  & .react-calendar-heatmap .color-step-3 {
    fill: ${({ theme }) => theme.colors.primary_00};
  }
`;
