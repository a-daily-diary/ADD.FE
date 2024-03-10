import type { DiaryDetail } from './diary';
import type { RegisterRequest } from './register';

export interface HeatmapCell {
  date: string;
  activityCount: number;
}

export interface HeatmapCellDetail extends HeatmapCell {
  activities: {
    diaryCount: number;
    commentCount: number;
    randomMatchingCount: number;
    diaries: DiaryDetail[]; // TODO: diaries 데이터 변경 필요
  };
}

/* Request */

export type GetHeatmapByUsernameRequest = Pick<RegisterRequest, 'username'>;

export interface GetHeatmapDetailRequest extends GetHeatmapByUsernameRequest {
  dateString: string;
}
