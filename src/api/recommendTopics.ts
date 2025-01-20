import type { GetRandomRecommendTopicResponse } from 'types/recommendTopics';
import type { SuccessResponse } from 'types/response';

import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getRandomRecommendTopic = async () => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<GetRandomRecommendTopicResponse>>(
    API_PATH.recommendTopics.getRandom,
  );

  return data;
};
