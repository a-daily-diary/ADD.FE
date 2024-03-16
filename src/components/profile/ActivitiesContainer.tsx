import { useState } from 'react';
import { ActivitiesCalendar } from './ActivitiesCalendar';
import { ActivityDetail } from './ActivityDetail';
import type { Activity } from 'types/activity';
import { dateStringFormat } from 'utils';

interface ActivitiesContainerProps {
  heatmapCalendarData: Activity[];
}

export const ActivitiesContainer = ({
  heatmapCalendarData,
}: ActivitiesContainerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const isSelected = selectedDate.length !== 0;

  const handleClick = (value: Activity) => {
    const { date } = value;

    setSelectedDate(dateStringFormat(date) as string);
  };

  return (
    <section>
      <ActivitiesCalendar
        heatmapCalendarData={heatmapCalendarData}
        selectedDate={selectedDate}
        onClick={handleClick}
      />

      {isSelected && <ActivityDetail dateString={selectedDate} />}
    </section>
  );
};
