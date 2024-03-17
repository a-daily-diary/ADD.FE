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

export interface GetActivitiesByUsernameRequest {
  username: Pick<RegisterRequest, 'username'>['username'];
  year: string | null;
}

export interface GetActivityDetailRequest {
  username: Pick<RegisterRequest, 'username'>['username'];
  dateString: string;
}
