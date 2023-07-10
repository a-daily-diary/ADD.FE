import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useTermsAgreements = () => {
  const { data: termsAgreementsData, isLoading } = useQuery(
    [queryKeys.termsAgreements],
    api.getTermsAgreement,
  );
  return { termsAgreementsData, isLoading };
};
