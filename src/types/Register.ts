export interface RegisterSchema {
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
export type DuplicationCheckRequest = Record<string, string>;
// 유저 이미지 업로드
export interface UploadImageRequest {
  image: FormData;
}
// 회원가입
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  imgUrl: string;
  isAgree: boolean;
}

/*
 * Response Data Types
 */

// 유저 이미지 업로드
export interface UploadImageResponse {
  data: { imgUrl: string };
}
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
