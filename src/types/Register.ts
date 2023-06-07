import type { TermsAgreementId } from './TermsAgreement';

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  imgUrl: string;
  termsAgreement: {
    service: boolean;
    privacy: boolean;
    marketing: boolean;
  };
}

/*
 * Request Data Types
 */

// 이메일/유저이름 중복 체크
export type ExistsRequest = Record<string, string>;

// 회원가입
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  imgUrl: string;
  termsAgreementIdList: TermsAgreementId[];
}

/*
 * Response Data Types
 */

// 이메일/유저이름 중복 체크, 회원가입
export interface RegisterResponse {
  message: string;
}

/*
 * Other Types
 */

// 회원가입 단계별 UI를 위한 타입
export interface RegisterStep {
  email: boolean;
  username: boolean;
  password: boolean;
  passwordCheck: boolean;
  imgUrl: boolean;
  termsAgreement: boolean;
  welcomeMessage: boolean;
}
