import type { GetHeatmapByUsernameRequest, HeatmapCells } from 'types/heatmap';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getHeatmapByUsername = async ({
  username,
}: GetHeatmapByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<HeatmapCells>>(
    `${API_PATH.heatmap.index}/${username}`,
  );
  return data;
};
