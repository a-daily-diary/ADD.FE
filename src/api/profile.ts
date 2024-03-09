import type { User } from 'next-auth';
import type {
  EditProfileRequest,
  GetProfileByUsernameRequest,
} from 'types/profile';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
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

export const editProfile = async ({ username, imgUrl }: EditProfileRequest) => {
  const {
    data: { data },
  } = await axios.put<SuccessResponse<Partial<User>>>(
    `${API_PATH.users.index}`,
    { username, imgUrl },
  );
  return data;
};
