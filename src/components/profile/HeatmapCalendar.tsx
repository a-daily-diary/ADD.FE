import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
];

const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HeatmapCalendar = () => {
  const today = new Date();
  const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (boxRef !== null) {
      boxRef.current?.scrollTo({ left: 1600 });
    }
  }, []);

  return (
    <>
      <HeatMapContainer ref={boxRef}>
        <WeekdayContainer>
          {WEEKDAY.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </WeekdayContainer>
        <Box>
          <CalendarHeatmap
            startDate={oneYearAgo}
            endDate={new Date()}
            values={data}
            classForValue={(value: { date: string; count: number }) => {
              if (value === null) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={(value: { date: string; count: number }) => {
              if (value.date === null) return false;
              return {
                'data-tooltip-id': 'my-tooltip',
                'data-tooltip-content': `${value.date} has count: ${value.count}`,
              };
            }}
            onClick={(value: { date: string; count: number }) => {
              alert(`Clicked on value with count: ${value.count}`);
            }}
            gutterSize={1}
          />
        </Box>
      </HeatMapContainer>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default HeatmapCalendar;

const HeatMapContainer = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: grid;
  grid-template-columns: 30px auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const WeekdayContainer = styled.ul`
  display: grid;
  grid-template-rows: repeat(7, 27.5px);
  row-gap: 3px;
  align-content: end;
  position: sticky;
  left: 0;
  bottom: 0;
  background-color: #fff;

  & li {
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 27.5px;
  }
`;

const Box = styled.div`
  width: 1600px;

  & .react-calendar-heatmap text {
    font-family: pretendard;
    font-size: 5px;
  }

  & .react-calendar-heatmap .react-calendar-heatmap-small-text {
    font-size: 5px;
  }

  & .react-calendar-heatmap rect {
    rx: 1px;
  }

  & .react-calendar-heatmap rect:hover {
    stroke: #555;
    stroke-width: 1px;
  }

  /*
 * Default color scale
 */

  & .react-calendar-heatmap .color-empty {
    fill: #eeeeee;
  }

  & .react-calendar-heatmap .color-filled {
    fill: #8cc665;
  }

  /*
 * Github color scale
 */

  & .react-calendar-heatmap .color-github-0 {
    fill: #eeeeee;
  }
  & .react-calendar-heatmap .color-github-1 {
    fill: #d6e685;
  }
  & .react-calendar-heatmap .color-github-2 {
    fill: #8cc665;
  }
  & .react-calendar-heatmap .color-github-3 {
    fill: #44a340;
  }
  & .react-calendar-heatmap .color-github-4 {
    fill: #1e6823;
  }
`;
