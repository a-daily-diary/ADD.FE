import type { RegisterRequest } from './register';

export interface HeatmapCell {
  date: string;
  activityCount: number;
}

export type HeatmapCells = HeatmapCell[];

/* Request */

export type GetHeatmapByUsernameRequest = Pick<RegisterRequest, 'username'>;
