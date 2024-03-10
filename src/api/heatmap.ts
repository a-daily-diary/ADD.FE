import type {
  GetHeatmapByUsernameRequest,
  GetHeatmapDetailRequest,
  HeatmapCell,
  HeatmapCellDetail,
} from 'types/heatmap';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getHeatmapByUsername = async ({
  username,
}: GetHeatmapByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<HeatmapCell[]>>(
    `${API_PATH.activities.index}/${username}`,
  );
  return data;
};

export const getHeatmapDetail = async ({
  username,
  dateString,
}: GetHeatmapDetailRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<HeatmapCellDetail>>(
    `${API_PATH.activities.index}/${username}/${dateString}`,
  );
  return data;
};
