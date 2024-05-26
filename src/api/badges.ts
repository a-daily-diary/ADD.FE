import type {
  Badge,
  GetBadgesByUsernameRequest,
  PatchPinnedBadgeByBadgeIdRequest,
  UserToBadge,
} from 'types/badges';
import type { SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getBadgesByUsername = async ({
  username,
  onlyPinned = false,
  config,
}: GetBadgesByUsernameRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Badge[]>>(
    `${API_PATH.badges.users}/${username}`,
    {
      ...config,
      params: {
        onlyPinned,
      },
    },
  );
  return data;
};

export const patchPinnedBadgeByBadgeId = async ({
  id,
}: PatchPinnedBadgeByBadgeIdRequest) => {
  const {
    data: { data },
  } = await axios.patch<SuccessResponse<UserToBadge>>(
    `${API_PATH.badges.index}/${id}`,
  );
  return data;
};
