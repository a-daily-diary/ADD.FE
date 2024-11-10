import type { MatchingHistory } from 'types/matchingHistories';
import type { SuccessResponse } from 'types/response';

import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getRecentMatchingHistory = async () => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<MatchingHistory>>(
    API_PATH.matchingHistories.recent,
  );

  return data;
};
