import type { GetHeatmapByUsernameRequest, HeatmapCells } from 'types/heatmap';
import type { SuccessResponse } from 'types/response';
import axios from 'lib/axios';

// TODO: #201 merge 후 API endpoint 수정
export const getHeatmapByUsername = async ({
  username,
}: GetHeatmapByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<HeatmapCells>>(
    `/heatmap/graph/${username}`,
  );
  return data;
};
