export type TermsAgreementId = 'service' | 'privacy';

export interface TermsContent {
  subTitle: string;
  content: string;
}

export interface TermsAgreement {
  id: TermsAgreementId;
  title: string;
  contents: TermsContent[];
  isRequired: boolean;
}
