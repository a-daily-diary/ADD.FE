export interface RegisterSchema {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  imgUrl: string;
  isAgree: boolean;
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
  isAgree: boolean;
}
