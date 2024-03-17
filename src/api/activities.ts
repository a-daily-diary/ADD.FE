import type {
  GetActivitiesByUsernameRequest,
  GetActivityDetailRequest,
  Activity,
  ActivityDetail,
} from 'types/activity';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getActivitiesByUsername = async ({
  username,
  year,
}: GetActivitiesByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Activity[]>>(
    `${API_PATH.activities.index}/${username}`,
    {
      params: {
        year,
      },
    },
  );
  return data;
};

export const getActivityDetail = async ({
  username,
  dateString,
}: GetActivityDetailRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<ActivityDetail>>(
    `${API_PATH.activities.index}/${username}/${dateString}`,
  );
  return data;
};
