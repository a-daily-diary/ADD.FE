import type { DiaryDetail } from './diary';
import type { RegisterRequest } from './register';

export interface Activity {
  date: string;
  activityCount: number;
}

export interface ActivityDetail extends Activity {
  activities: {
    diaryCount: number;
    commentCount: number;
    randomMatchingCount: number;
    diaries: DiaryDetail[];
  };
}

/* Request */

export type GetActivitiesByUsernameRequest = Pick<RegisterRequest, 'username'>;

export interface GetActivityDetailRequest
  extends GetActivitiesByUsernameRequest {
  dateString: string;
}
