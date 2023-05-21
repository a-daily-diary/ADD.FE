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

// email, username 중복체크 확인 요청 타입
export type DuplicationCheckRequest = Record<string, string>;

export interface RegisterResponse {
  message: string;
}

export interface RegisterStep {
  email: boolean;
  username: boolean;
  password: boolean;
  passwordCheck: boolean;
  imgUrl: boolean;
  termsAgreement: boolean;
}

export interface UploadImageResponse {
  data: { imgUrl: string };
}
export interface UploadImageRequest {
  image: FormData;
}
