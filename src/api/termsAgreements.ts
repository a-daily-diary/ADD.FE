import type { SuccessResponse } from 'types/response';
import type { TermsAgreement } from 'types/termsAgreement';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const getTermsAgreement = async () => {
  const { data } = await axios.get<SuccessResponse<TermsAgreement[]>>(
    API_PATH.terms.index,
  );
  return data.data;
};
