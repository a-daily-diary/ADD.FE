import { useState } from 'react';
import { ActivitiesCalendar } from './ActivitiesCalendar';
import { HeatmapDetail } from './HeatmapDetail';
import type { HeatmapCell } from 'types/heatmap';
import { dateStringFormat } from 'utils';

interface ActivitiesContainerProps {
  heatmapCalendarData: HeatmapCell[];
}

export const ActivitiesContainer = ({
  heatmapCalendarData,
}: ActivitiesContainerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const isSelected = selectedDate.length !== 0;

  const handleClick = (value: HeatmapCell) => {
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

      {isSelected && <HeatmapDetail dateString={selectedDate} />}
    </section>
  );
};
