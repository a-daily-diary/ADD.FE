import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useRandomRecommendTopic = () => {
  const response = useQuery({
    queryKey: [queryKeys.randomRecommendTopic],
    queryFn: api.getRandomRecommendTopic,
  });

  return response;
};
