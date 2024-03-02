import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/service';

export const useProfile = (username: string) => {
  const { data: profileData, isLoading } = useQuery(
    [queryKeys.users, username],
    async () => await api.getProfileByUsername({ username }),
  );
  return { profileData, isLoading };
};
