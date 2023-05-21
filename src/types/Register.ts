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

export type RegisterRequest = Record<string, string>;

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
