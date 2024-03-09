import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { WEEKDAY } from 'constants/common';
import { HEATMAP_WIDTH } from 'constants/styles';
import { getLastYearDate } from 'utils';

// TODO: Mock data 제거
const data = [
  {
    date: '2022-04-25',
    count: 1,
  },
  {
    date: '2023-01-01',
    count: 1,
  },
  {
    date: '2023-01-11',
    count: 2,
  },
  {
    date: '2023-02-01',
    count: 3,
  },
  {
    date: '2023-04-24',
    count: 3,
  },
  {
    date: '2024-03-03',
    count: 6,
  },
];

interface Value {
  date: string;
  count: number;
}

export const HeatmapCalendar = () => {
  const today = new Date();

  const boxRef = useRef<HTMLDivElement | null>(null);

  const getClassForValue = (value: Value) => {
    if (value === null) return 'color-step-0';

    const { count } = value;

    if (count > 0) return 'color-step-1';
    if (count > 2) return 'color-step-2';
    if (count > 4) return 'color-step-3';

    return 'color-step-0';
  };

  // TODO: Tooltip 필요한지 확인
  const getTooltipDataAttrs = (value: Value) => {
    const content =
      value.date === null ? today : `${value.date} has count: ${value.count}`;

    return {
      'data-tooltip-id': 'my-tooltip',
      'data-tooltip-content': content,
    };
  };

  const handleClick = (value: Value) => {
    if (value === null) return;

    // TODO: 클릭 시 해당 날짜 활동 내역 보여주기
    console.log(`Clicked on value with count: ${value.count}`);
  };

  useEffect(() => {
    if (boxRef?.current !== null) {
      boxRef.current.scrollTo({ left: HEATMAP_WIDTH });
    }
  }, []);

  return (
    <Container>
      <Contents ref={boxRef}>
        <WeekdayList>
          {WEEKDAY.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </WeekdayList>

        <CalendarContainer>
          <CalendarHeatmap
            gutterSize={1}
            startDate={getLastYearDate(today)}
            endDate={today}
            values={data}
            classForValue={(value: Value) => getClassForValue(value)}
            tooltipDataAttrs={(value: Value) => getTooltipDataAttrs(value)}
            onClick={(value: Value) => {
              handleClick(value);
            }}
          />
        </CalendarContainer>
      </Contents>

      {/* TODO: Tooltip 필요한지 확인 */}
      <Tooltip id="my-tooltip" />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;

const Contents = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 28px auto;
  gap: 2px;
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
