import type { TermsAgreementId } from './termsAgreement';

export type RegisterForm = Omit<RegisterRequest, 'termsAgreementIdList'> & {
  passwordCheck: string;
  termsAgreement: {
    [key in TermsAgreementId]: boolean;
  };
};

/* Request */

export type ExistsRequest = Record<string, string>;

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  imgUrl: string;
  termsAgreementIdList: TermsAgreementId[];
}

/* Other */

export interface RegisterStep {
  email: boolean;
  username: boolean;
  password: boolean;
  passwordCheck: boolean;
  imgUrl: boolean;
  termsAgreement: boolean;
  welcomeMessage: boolean;
}
