import { useMutation } from '@tanstack/react-query';

import type { CreateMatchingFeedbackRequest } from 'types/matching';
import * as api from 'api';

export const useCreateMatchingFeedback = () => {
  return useMutation(
    async (payload: CreateMatchingFeedbackRequest) =>
      await api.createMatchingFeedback(payload),
  );
};
