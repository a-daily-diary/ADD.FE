import type {
  CreateMatchingFeedbackRequest,
  CreateMatchingFeedbackResponse,
  MatchingHistoryResponse,
} from 'types/matching';
import type { SuccessResponse } from 'types/response';

import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getRecentMatchingHistory = async () => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<MatchingHistoryResponse>>(
    API_PATH.matchingHistories.recent,
  );

  return data;
};

export const createMatchingFeedback = async (
  payload: CreateMatchingFeedbackRequest,
) => {
  const { matchingHistoryId, ...feedbackForm } = payload;

  const response = await axios.post<
    SuccessResponse<CreateMatchingFeedbackResponse>
  >(API_PATH.matchingHistories.feedback(matchingHistoryId), feedbackForm);

  return response;
};
