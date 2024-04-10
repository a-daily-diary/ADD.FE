import styled from '@emotion/styled';
import { useState } from 'react';
import { ActivitiesCalendar } from './ActivitiesCalendar';
import { ActivitiesInformation } from './ActivitiesInformation';
import { ActivityDetail } from './ActivityDetail';
import type { ChangeEventHandler } from 'react';
import type { Activity } from 'types/activity';
import { QuestionIcon } from 'assets/icons';
import { FullPageLoading, Popover } from 'components/common';
import { useClickOutside } from 'hooks/common';
import { useActivities } from 'hooks/services';
import { SVGVerticalAlignStyle, ScreenReaderOnly } from 'styles';
import {
  dateStringFormat,
  getLastYearDate,
  getYearsFromStartYearToNow,
} from 'utils';

const today = new Date();
const initialCalendarDate = {
  startDate: getLastYearDate(today),
  endDate: today,
  activeYear: null,
};

interface ActivitiesContainerProps {
  title: string;
  username: string;
}

export const ActivitiesContainer = ({
  title,
  username,
}: ActivitiesContainerProps) => {
  const todayDateString = dateStringFormat(today.toDateString());
  const years = getYearsFromStartYearToNow();

  const [calendarDate, setCalendarDate] = useState<{
    startDate: Date;
    endDate: Date;
    activeYear: string | null;
  }>(initialCalendarDate);
  const [selectedDate, setSelectedDate] = useState<string>(todayDateString);

  const { ref, isVisible, setIsVisible } = useClickOutside();
  const { activitiesData } = useActivities({
    username,
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

    setSelectedDate(dateStringFormat(date));
  };

  if (activitiesData === undefined) {
    return <FullPageLoading />;
  }

  const handleClickQuestion = () => {
    setIsVisible((state) => !state);
  };

  return (
    <section>
      <Title>{title}</Title>
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
        <ActivitiesInformationContainer>
          <QuestionButton ref={ref} type="button" onClick={handleClickQuestion}>
            <QuestionIcon />
          </QuestionButton>
          {isVisible && (
            <Popover positionBase="bottom">
              <ActivitiesInformation />
            </Popover>
          )}
        </ActivitiesInformationContainer>
      </ActivitiesCalendarHeader>

      <ActivitiesCalendar
        activitiesData={activitiesData}
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        onClick={handleClick}
      />

      {isSelected && (
        <ActivityDetail dateString={selectedDate} username={username} />
      )}
    </section>
  );
};

const Title = styled.h2`
  ${ScreenReaderOnly}
`;

const ActivitiesCalendarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 50px;
`;

const Select = styled.select`
  border: 0;
  ${({ theme }) => theme.fonts.body_07}
`;

const QuestionButton = styled.button`
  ${SVGVerticalAlignStyle}
`;

const ActivitiesInformationContainer = styled.div`
  position: relative;
`;
