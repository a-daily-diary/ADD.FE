export type TermsAgreementId = 'service' | 'privacy' | 'marketing';

export interface TermsAgreement {
  id: TermsAgreementId;
  title: string;
  content: string;
  isRequired: boolean;
}

/* Response */

export type TermsAgreementResponse = TermsAgreement[];
