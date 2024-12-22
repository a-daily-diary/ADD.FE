import type { OnlyMessageResponse, SuccessResponse } from 'types/response';

import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const addToBlackList = async (blockedUserId: string) => {
  const {
    data: { data },
  } = await axios.post<SuccessResponse<OnlyMessageResponse>>(
    API_PATH.blacklist.addToBlackList(blockedUserId),
  );

  return data.message;
};
