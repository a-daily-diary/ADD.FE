export interface TermsAgreement {
  id: TermsAgreementId;
  title: string;
  content: string;
  isRequired: boolean;
}

export type TermsAgreementId = 'service' | 'privacy' | 'marketing';

/*
 * Response Data Types
 */

// 회원가입 약관
export type TermsAgreementResponse = TermsAgreement[];
