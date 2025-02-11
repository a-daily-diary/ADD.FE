export type TermsAgreementId = 'service' | 'privacy';

export interface TermsAgreement {
  id: TermsAgreementId;
  title: string;
  content: string;
  isRequired: boolean;
}
