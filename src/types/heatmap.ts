import type { RegisterRequest } from './register';

export interface HeatmapCell {
  date: string;
  activityCount: number;
}

/* Request */

export type GetHeatmapByUsernameRequest = Pick<RegisterRequest, 'username'>;
