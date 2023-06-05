import type { SuccessResponse } from 'types/Response';
import type { TermsAgreementResponse } from 'types/TermsAgreement';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const getTermsAgreement = async () => {
  const { data } = await axios.get<SuccessResponse<TermsAgreementResponse>>(
    API_PATH.terms.index,
  );
  return data.data;
};
