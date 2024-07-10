import { useQuery } from '@tanstack/react-query';
import type { GetBadgesByUsernameRequest } from 'types/badges';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useBadges = ({
  username,
  onlyPinned,
}: GetBadgesByUsernameRequest) => {
  const { data: badgesData, isLoading } = useQuery(
    [queryKeys.badges, username, onlyPinned],
    async () => await api.getBadgesByUsername({ username, onlyPinned }),
  );
  return { badgesData, isLoading };
};
