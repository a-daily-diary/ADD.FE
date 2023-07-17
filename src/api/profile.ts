import type { User } from 'next-auth';
import type { GetProfileByUsernameRequest } from 'types/profile';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const getProfileByUsername = async ({
  username,
  config,
}: GetProfileByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<User>>(
    `${API_PATH.users.index}/${username}`,
    config,
  );
  return data;
};
