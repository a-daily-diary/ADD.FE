import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { HeatmapDetail } from './HeatmapDetail';
import type { HeatmapCell } from 'types/heatmap';
import { DAY_OF_WEEK } from 'constants/common';
import { HEATMAP_WIDTH } from 'constants/styles';
import { getLastYearDate, dateStringFormat } from 'utils';

interface ActivitiesContainerProps {
  heatmapCalendarData: HeatmapCell[];
}

export const ActivitiesContainer = ({
  heatmapCalendarData,
}: ActivitiesContainerProps) => {
  const today = new Date();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const getClassForValue = (value: HeatmapCell) => {
    if (value === null) return;

    const { activityCount, date } = value;
    const isSelected = date === selectedDate;
    let className = '';

    switch (true) {
      case activityCount > 4:
        className = 'color-step-3';
        break;
      case activityCount > 2:
        className = 'color-step-2';
        break;
      case activityCount > 0:
        className = 'color-step-1';
        break;
      default:
        className = 'color-step-0';
    }

    return isSelected ? `${className} selected` : className;
  };

  const handleClick = (value: HeatmapCell) => {
    const { date } = value;

    setSelectedDate(dateStringFormat(date) as string);
  };

  useEffect(() => {
    if (boxRef?.current !== null) {
      boxRef.current.scrollTo({ left: HEATMAP_WIDTH });
    }
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
            classForValue={getClassForValue}
            onClick={handleClick}
          />
        </CalendarContainer>
      </Contents>

      {selectedDate.length !== 0 && <HeatmapDetail dateString={selectedDate} />}
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
  ${({ theme }) => theme.fonts.caption_03}
`;

const CalendarContainer = styled.div`
  width: ${HEATMAP_WIDTH}px;
  height: 240px;

  & .react-calendar-heatmap .react-calendar-heatmap-all-weeks {
    transform: translate(0, 13px);
  }

  & .react-calendar-heatmap text {
    ${({ theme }) => theme.fonts.caption_01};
    font-size: 0.55rem;
  }

  & .react-calendar-heatmap rect {
    rx: 1px;
  }

  & .react-calendar-heatmap .selected {
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
