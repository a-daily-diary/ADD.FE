import styled from '@emotion/styled';
import { useState } from 'react';
import { ActivitiesCalendar } from './ActivitiesCalendar';
import { ActivitiesInformation } from './ActivitiesInformation';
import { ActivityDetail } from './ActivityDetail';
import type { ChangeEventHandler } from 'react';
import type { Activity } from 'types/activity';
import { QuestionIcon } from 'assets/icons';
import { FullPageLoading, PopOver } from 'components/common';
import { useClickOutside } from 'hooks/common';
import { useActivities } from 'hooks/services';
import { SVGVerticalAlignStyle, ScreenReaderOnly } from 'styles';
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

interface ActivitiesContainerProps {
  title: string;
  username: string;
}

export const ActivitiesContainer = ({
  title,
  username,
}: ActivitiesContainerProps) => {
  const today = new Date();
  const todayDateString = dateStringFormat(today.toDateString()) as string;
  const years = getYearsForActivitiesCalendar();

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

    setSelectedDate(dateStringFormat(date) as string);
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
            <PopOver>
              <ActivitiesInformation />
            </PopOver>
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
