export interface RegisterSchema {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  imgUrl: string;
  isAgree: boolean;
}

export interface RegisterRequest {
  email: string;
}

export interface RegisterResponse {
  message: string;
}

export type RegisterStep =
  | 'email'
  | 'username'
  | 'password'
  | 'passwordCheck'
  | 'imgUrl'
  | 'isAgree';
